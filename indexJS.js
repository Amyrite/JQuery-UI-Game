//Redirection of Sign Up
$(document).ready(function() {
    // Add click event listener to the "Sign Up" link
    $('#signUpLink').click(function() {
        console.log("click");
        // Hide the login form and show the signup form
        $('#loginForm').hide();
        $('#signupForm').show();
    });
});

//Account Creation
$(document).ready(function() {
    $('#signupBtn').click(function(e) {
        e.preventDefault(); // Prevent form submission
        
        // Get form data
        var email = $('#emailForm').val();
        var username = $('#usernameForm').val();
        var password = $('#passwordForm').val();
        
        // AJAX request to send form data to PHP script
        $.ajax({
            type: 'POST',
            url: 'create.php',
            data: { email: email, username: username, password: password },
            success: function(response) {
                alert(response); // Alert the response from PHP script
                // Redirect to login page or perform other actions as needed
                window.location.href = 'index.html';
            },
            error: function(xhr, status, error) {
                console.error('Error:', error); // Log any errors
            }
        });
    });
});

//Account Checking
$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault(); // Prevent form submission
        
        // Get form data
        var username = $('#usernameForm').val();
        var password = $('#passwordForm').val();
        sessionStorage.setItem('username', username);
        
        // AJAX request to check login
        $.ajax({
            type: 'POST',
            url: 'read.php', // PHP script to handle login check
            data: { username: username, password: password },
            success: function(response) {
                if (response === 'success') {
                    // Login successful, redirect to dashboard or perform other actions
                    window.location.href = 'dashboard.html';
                } else {
                    // Login failed, display error message
                    alert('Invalid username or password. Please try again.');
                }
            },
            error: function(xhr, status, error) {
                console.error('Error:', error); // Log any errors
            }
        });
    });
});




