<?php
// Load the XML file
$xml = new DOMDocument();
$xml->load("users.xml");

// Get the username from the AJAX request
$username = $_GET['username'];

// Find the user element with the specified username
$users = $xml->getElementsByTagName("user");
$rank = '';

foreach ($users as $user) {
    $xmlUsername = $user->getElementsByTagName("username")[0]->nodeValue;
    if ($xmlUsername === $username) {
        $rank = $user->getElementsByTagName("rank")[0]->nodeValue;
        break;
    }
}

// Return the rank
echo $rank;
?>
