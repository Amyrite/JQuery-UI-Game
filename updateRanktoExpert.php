<?php
// Read XML file
$xml = new DOMDocument();
$xml->load("users.xml");

$username = $_GET['username'];
$users = $xml->getElementsByTagName("user");

// Iterate through each user
foreach ($users as $user) {
    // Check if the username and rank match the conditions
    if ($user->username == 'username' && $user->rank == 'Advanced') {
        // Update the rank to 'Elementary'
        $user->rank = 'Expert';

        // Save the updated XML to the file
        $xml->save("users.xml");

        // Output success message
        echo 'Rank updated successfully!';
        return; // Exit the loop
    }
}

// Output error message if no matching user is found
echo 'User with username "username" and rank "Expert" not found.';
?>
