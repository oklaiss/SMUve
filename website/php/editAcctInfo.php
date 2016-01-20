<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$curr_password = $_POST['curr_password'];
$new_password = $_POST['new_password'];
$new_password_conf = $_POST['new_password_conf'];

$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email' AND password = '$curr_password'");
$idNum = mysqli_fetch_row($queryID);

$queryCheck = mysqli_query($database, "SELECT COUNT(*) FROM Users WHERE email = '$email' AND password = '$curr_password'");
$checkResultNum = mysqli_fetch_array($queryCheck);

if(($checkResultNum[0] == 1)) {
	if( $new_password == $new_password_conf){
		//echo $idNum[0];
		$response = mysqli_query($database, "UPDATE Users SET password ='$new_password' WHERE id = '$idNum[0]'");
		$queryCheckNew = mysqli_query($database, "SELECT COUNT(*) FROM Users WHERE email = '$email' AND password = '$new_password'");
		$checkChange = mysqli_fetch_array($queryCheckNew);
		if($checkChange[0] == 1){
			echo "Valid";
		}else{
			echo "unable to change databse";
		}
	}else{
		echo "passwords do not match";
	}
} else {
	echo "incorrectPassword";
}


?>