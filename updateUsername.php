<?php
// Get the account number and new username from the POST request
$accNo = $_POST['accNo'];
$newUsername = $_POST['newUsername'];

// Load the XML file
$xml = new DOMDocument();
$xml->load("users.xml");

// Find the user element with the specified account number
$users = $xml->getElementsByTagName("user");

foreach ($users as $user) {
    $xmlAccNo = $user->getAttribute('accNo');
    if ($xmlAccNo == $accNo) {
        // Update the username
        $user->getElementsByTagName("username")[0]->nodeValue = $newUsername;
        break;
    }
}

// Save the updated XML to the file
$xml->save("users.xml");

// Output success message
echo 'Username updated successfully!';
?>
