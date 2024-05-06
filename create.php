<?php

$xml = new DOMDocument();
$xml->load("users.xml");

$users = $xml->getElementsByTagName("user");

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve form data
    $emailValue = $_POST['email'];
    $usernameValue = $_POST['username'];
    $passwordValue = $_POST['password'];
    
    // Flag to indicate whether the username or email already exists
    $userExists = false;

    // Iterate through existing users to check for duplicates
    foreach ($users as $user) {
        $existingUsername = $user->getElementsByTagName("username")[0]->nodeValue;
        $existingEmail = $user->getElementsByTagName("email")[0]->nodeValue;
        
        // Check if username or email already exists
        if ($existingUsername === $usernameValue || $existingEmail === $emailValue) {
            $userExists = true;
            break;
        }
    }

    // If username or email already exists, display error message
    if ($userExists) {
        echo 'Username or email already exists!';
    } else {
        // Create new user element
        $user = $xml->createElement("user");
        $username = $xml->createElement("username", $usernameValue);
        $email = $xml->createElement("email", $emailValue);
        $password = $xml->createElement("password", $passwordValue);
        
        $user->appendChild($username);
        $user->appendChild($email);
        $user->appendChild($password);
        $user->setAttribute("accNo", $users->length + 1); // Use total number of users as account number
        
        // Append new user element
        $xml->getElementsByTagName("users")[0]->appendChild($user);
        
        // Save XML file
        if ($xml->save("users.xml")) {
            // Output success message
            echo 'User signed up successfully!';
        } else {
            // Output error message
            echo 'Error: Failed to save user data.';
        }
    }
} else {
    // If the form is not submitted, redirect back
    header('Location: index.php');
    exit;
}
?>
