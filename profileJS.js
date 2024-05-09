$(document).ready(function() {
    // Event listener for clicking on the editUsername button
    $('#editUsername').click(function() {
        $('.editUsername-card').css('display', 'block'); // Display the editUsername card
        $('#newusernameForm').css('display', 'block'); // Display the new username input field
    });
    
    // Event listener for clicking on the editPassword button
    $('#editPassword').click(function() {
        $('.editPassword-card').css('display', 'block'); // Display the editPassword card
        $('#newpasswordForm').css('display', 'block'); // Display the new password input field
    });

    // Event listener for clicking on the Cancel button in the editUsername card
    $('.editUsername-card button:contains("Cancel")').click(function() {
        $('.editUsername-card').css('display', 'none'); // Hide the editUsername card
        $('#newusernameForm').css('display', 'none'); // Hide the new username input field
    });
    
    // Event listener for clicking on the Cancel button in the editPassword card
    $('.editPassword-card button:contains("Cancel")').click(function() {
        $('.editPassword-card').css('display', 'none'); // Hide the editPassword card
        $('#newpasswordForm').css('display', 'none'); // Hide the new password input field
    });

    // Event listener for clicking on the Save button in the editUsername card
    $('.editUsername-card button:contains("Save")').click(function() {
        var newUsername = $('#newusernameForm').val(); // Get the new username from the input field
        var accNo = sessionStorage.getItem('accNo'); // Get the account number from sessionStorage
        updateUsername(accNo, newUsername); // Call the function to update the username
    });
    
    // Event listener for clicking on the Save button in the editPassword card
    $('.editPassword-card button:contains("Save")').click(function() {
        var newPassword = $('#newpasswordForm').val(); // Get the new password from the input field
        var accNo = sessionStorage.getItem('accNo'); // Get the account number from sessionStorage
        updatePassword(accNo, newPassword); // Call the function to update the password
    });
});

// Function to update the username using AJAX
function updateUsername(accNo, newUsername) {
    $.ajax({
        type: 'POST',
        url: 'updateUsername.php', // Replace 'updateUsername.php' with the actual endpoint
        data: { accNo: accNo, newUsername: newUsername },
        success: function(response) {
            // Handle the success response (if any)
            console.log('Username updated successfully:', response);
            // Additional actions if needed
        },
        error: function(xhr, status, error) {
            // Handle the error response
            console.error('Error updating username:', error);
            // Additional error handling if needed
        }
    });
}

// Function to update the password using AJAX
function updatePassword(accNo, newPassword) {
    $.ajax({
        type: 'POST',
        url: 'updatePassword.php', // Replace 'updatePassword.php' with the actual endpoint
        data: { accNo: accNo, newPassword: newPassword },
        success: function(response) {
            // Handle the success response (if any)
            console.log('Password updated successfully:', response);
            // Additional actions if needed
        },
        error: function(xhr, status, error) {
            // Handle the error response
            console.error('Error updating password:', error);
            // Additional error handling if needed
        }
    });
}

$(document).ready(function() {
    // Event listener for clicking the edit profile picture button
    $('#editProfilePic').click(function() {
        // Trigger click on hidden file input to open file dialog
        $('#profilePicInput').click();
    });

    // Event listener for when a file is selected
    $('#profilePicInput').change(function() {
        // Get the selected file
        var file = this.files[0];

        // Check if a file is selected
        if (file) {
            // Create a FileReader object to read the file
            var reader = new FileReader();

            // Event listener for when file reading is complete
            reader.onload = function(e) {
                // Set the source of the profile picture to the read file data URL
                $('.profile-img img').attr('src', e.target.result);
            };

            // Read the selected file as a Data URL
            reader.readAsDataURL(file);
        }
    });
});
