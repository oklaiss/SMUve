<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$queryCheck = mysqli_query($database, "SELECT COUNT(*) AS total FROM Users WHERE email = '$email'");
$checkResultNum = mysqli_fetch_assoc($queryCheck);

if ($checkResultNum['total'] != 0) { //Confirm that this is the first time the email is being regiestered
	echo "bad";
}

else {
	$email = $_POST['email'];
	$first_name = $_POST['firstname'];
	$last_name = $_POST['lastname'];
	$password = $_POST['password'];
	$state = $_POST['state'];
	$zip = $_POST['zipcode'];
	$response = $database->query("INSERT INTO Users (email, password, first_name, last_name, state, zip)
              VALUES ( '$email', '$password', '$first_name', '$last_name', '$state', '$zip')");
	echo $response;
}

mysqli_close($database);


?>
