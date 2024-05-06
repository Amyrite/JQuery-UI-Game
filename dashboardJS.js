document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the username from sessionStorage
    var username = sessionStorage.getItem('username');

    // Display the username in the usernameDisplay element
    document.getElementById('usernameDisplay').textContent = username;

    // Fetch the rank associated with the username
    fetchRank(username);
});

function fetchRank(username) {
    // Make an AJAX request to fetch the rank
    $.ajax({
        type: 'GET',
        url: 'getRank.php', // Replace 'getRank.php' with the actual endpoint to fetch the rank
        data: { username: username },
        success: function(response) {
            // Update the rank element with the fetched rank
            document.getElementById('rank').textContent = response;
        },
        error: function(xhr, status, error) {
            console.error('Error fetching rank:', error); // Log any errors
        }
    });
}
