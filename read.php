<?php
// Read 'users.xml' file
$xml = new DOMDocument();
$xml->load("users.xml");


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
// Read form data
$username = $_POST['username'];
$password = $_POST['password'];

// Check if the provided username and password match any user data
$users = $xml->getElementsByTagName("user");
$loginSuccessful = false;
foreach ($users as $user) {
    $xmlUsername = $user->getElementsByTagName("username")[0]->nodeValue;
    $xmlPassword = $user->getElementsByTagName("password")[0]->nodeValue;
    if ($username === $xmlUsername && $password === $xmlPassword) {
        $loginSuccessful = true;
        break;
    }
}
}

// Return response
if ($loginSuccessful) {
    echo 'success';
} else {
    echo 'failure';
}
?>
