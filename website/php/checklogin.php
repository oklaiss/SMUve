<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$password = $_POST['password'];

$queryCheck = mysqli_query($database, "SELECT COUNT(*) FROM Users WHERE email = '$email' AND password = '$password'");
$checkResultNum = mysqli_fetch_row($queryCheck);

if($checkResultNum[0] == 1)
	echo "Valid";
else
	echo "Invalid";
mysqli_free_result($checkResultNum);
mysqli_close($database);

?>