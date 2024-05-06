$(document).ready(function() {
    document.addEventListener("DOMContentLoaded", function() {
        // Retrieve the username from sessionStorage
        var username = sessionStorage.getItem('username');
    
        // Fetch the rank using AJAX
        fetchRank(username);
    });
    
    function fetchRank(username) {
        // Make an AJAX request to fetch the rank
        $.ajax({
            type: 'GET',
            url: 'getRank.php', // Adjust the URL to the actual endpoint to fetch the rank
            data: { username: username },
            success: function(response) {
                // Update the playerRank variable with the fetched rank
                var playerRank = response;
                
                // Update the rank element with the fetched rank
                document.getElementById('rank').textContent = playerRank;
                
                // Update the difficulty buttons based on the fetched rank
                updateDifficultyButtons(playerRank);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching rank:', error); // Log any errors
            }
        });
    }
    
    // Function to enable/disable difficulty buttons based on player's rank
    function updateDifficultyButtons(playerRank) {
        // List of difficulty levels and their corresponding ranks
        var difficultyRanks = {
            "Beginner": 1,
            "Elementary": 2,
            "Intermediate": 3,
            "Advanced": 4,
            "Expert": 5
        };
        
        // Loop through each difficulty button
        $(".difficulty").each(function() {
            var difficulty = $(this).attr("id"); // Get the difficulty level from the button's ID
            var difficultyRank = difficultyRanks[difficulty]; // Get the rank of the difficulty level
            
            // Check if the player's rank is high enough to unlock this difficulty level
            if (difficultyRank <= difficultyRanks[playerRank]) {
                $(this).prop("disabled", false); // Enable the button
            } else {
                $(this).prop("disabled", true); // Disable the button
            }
        });
    }
    
    // Event listener for clicking on a difficulty button
    $(".difficulty").click(function() {
        // Get the href attribute of the clicked button
        var url = $(this).attr("href");
        
        // Navigate to the specified URL
        window.location.href = url;
    });
});
