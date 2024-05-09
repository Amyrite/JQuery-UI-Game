<?php
// Get the account number and new password from the POST request
$accNo = $_POST['accNo'];
$newPassword = $_POST['newPassword'];

// Load the XML file
$xml = new DOMDocument();
$xml->load("users.xml");

// Find the user element with the specified account number
$users = $xml->getElementsByTagName("user");

foreach ($users as $user) {
    $xmlAccNo = $user->getAttribute('accNo');
    if ($xmlAccNo == $accNo) {
        // Update the password
        $user->getElementsByTagName("password")[0]->nodeValue = $newPassword;
        break;
    }
}

// Save the updated XML to the file
$xml->save("users.xml");

// Output success message
echo 'Password updated successfully!';
?>
