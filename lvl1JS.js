$(document).ready(function() {
    console.log("here");
    // Counter for correct matches
    var correctMatches = 0;
    var maxAttempts = 5;
    var incorrectAttempts = 0; 

    $('#game-container').prepend('<div id="lives-container">Lives: <span id="lives-count">' + (maxAttempts - incorrectAttempts) + '</span></div>');
    

    // Load XML file and parse data
    $.ajax({
        type: "GET",
        url: "words.xml",
        success: function(xml) {
            console.log(xml);

            // Find words with difficulty level "Beginner"
            $(xml).find('word').each(function() {
                var wordNo = $(this).attr('no');
                var hanziValue = $(this).find('hanzi').text();
                var pinyinValue = $(this).find('pinyin').text();
                var translationValue = $(this).find('english').text();
                var partOfSpeechValue = $(this).find('speech').text();
                var difficultyValue = $(this).find('difficulty').text();
                
                if (difficultyValue === 'Beginner') {
                    // Create card element
                    var card = $('<div class="card" data-part-of-speech="' + partOfSpeechValue + '">' + hanziValue + '<br>' + pinyinValue + '<br>' + translationValue + '</div>');
                    $('#cards-container').append(card);
                }
            });
            
            // Enable drag and drop functionality
            $('.card').draggable({
                revert: 'invalid',
                cursor: 'pointer'
            });
            $('.bin').droppable({
                drop: function(event, ui) {
                    var droppedCard = ui.draggable;
                    var binPartOfSpeech = $(this).data('part-of-speech');
                    var cardPartOfSpeech = droppedCard.data('part-of-speech');
                    
                    if (binPartOfSpeech === cardPartOfSpeech) {
                        // Correct match
                        droppedCard.addClass('correct');
                        // Increment correct matches
                        correctMatches++;
                        droppedCard.draggable('disable');

                        droppedCard.css({
                            'border-color': 'green',
                            'background-color': 'lightgreen'
                        });

                        // Check if all cards are correctly matched
                        var totalCards = $('.card').length;
                        if (correctMatches === totalCards) {
                            var nextButton = $('<button id="next">Next</button>');
                            var gameWinMessage = $('<div id="gameWinMessage"><h2>Congrats!</h2> <p>You can advance to the next level!</p></div>');
                            gameWinMessage.append(nextButton);
                            $('#game-container').append(gameWinMessage); // Append to #game-container
                        }
                    } else {
                        // Incorrect match
                        droppedCard.addClass('incorrect');
                        incorrectAttempts++;
                        $('#lives-count').text(maxAttempts - incorrectAttempts);
                        if (incorrectAttempts >= maxAttempts) {
                            var redoButton = $('<button id="redo">Redo</button>');
                            var gameOverMessage = $('<div id="gameOverMessage"><h2>Game Over!</h2> <p>You have exceeded the maximum number of attempts. Click the button to try again.</p></div>');
                            gameOverMessage.append(redoButton);
                            $('#game-container').append(gameOverMessage); // Append to #game-container
                            
                            // Disable further dragging
                            $('.card').draggable('disable');
                        }
                    }
                }
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading XML file:', error);
        }
    });

    $(document).on('click', '#next', function() {
        // Reload the page to restart the game
        window.location.href = "play2.html";
    });

    $(document).on('click', '#redo', function() {
        // Reload the page to restart the game
        location.reload();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    
    var popup = document.getElementById("popup");
    var overlay = document.getElementById("overlay");
    var closeBtn = document.getElementById("closeBtn");

    function openPopup() {
        popup.style.display = "block";
        overlay.style.display = "block";
    }

    function closePopup() {
        popup.style.display = "none";
        overlay.style.display = "none";
    }

    closeBtn.addEventListener("click", closePopup);

    openPopup(); // Open the popup when the DOM is fully loaded
});

document.addEventListener("DOMContentLoaded", function() {
    var username = sessionStorage.getItem('username');
    fetchRank(username);
});

function fetchRank(username) {
    $.ajax({
        type: 'GET',
        url: 'getRank.php',
        data: { username: username },
        success: function(response) {
            // Update the rank element with the fetched rank
            document.getElementById('rank').textContent = response;
            if (response !== 'Elementary') {
                updateRankToElementary(username);
            }
        },
        error: function(xhr, status, error) {
            console.error('Error fetching rank:', error);
        }
    });
}

function updateRankToElementary(username) {
    $.ajax({
        type: 'POST',
        url: 'updateRanktoElementary.php',
        data: { username: username },
        success: function(response) {
            console.log('Rank updated to Elementary successfully.');
            document.getElementById('rank').textContent = 'Elementary';
        },
        error: function(xhr, status, error) {
            console.error('Error updating rank to Elementary:', error);
        }
    });
}

