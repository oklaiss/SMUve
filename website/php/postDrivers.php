<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$userID = $idNum[0];
if(mysqli_num_rows($database->query("select * from Driver where userID = '$userID'"))==0)
{
	$phoneNum = $_POST['phoneNumber'];
	$vehicle_name = $_POST['model'];
	$vehicle_year = $_POST['year'];
	$extra = $_POST['extraInfo'];
	$hasStorage = $_POST['canStore'];


	$response = $database->query("INSERT INTO Driver (userID, vehicle_name, vehicle_year, hasStorage, active, phoneNum, ror, extraInfo)
								  VALUES ('$userID','$vehicle_name', '$vehicle_year', '$hasStorage', 1, '$phoneNum', 1, '$extra')");

							
	if($response != false) {
	  echo "Valid";
	}
	else {
	  echo "Driver failed to post";
	}
}
else
	echo "User already has a posted car";
mysqli_close($database);
?>
