<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$userID = $idNum[0];
$response = $database->query("select * from Driver where userID = '$userID'");
if(mysqli_num_rows($response)>0)
{
	while($data = mysqli_fetch_assoc($response)) { //Loop through all the matching posts and start the JSON creation
		if($data['active'] == 1)
		{
		$reponse = $database->query("update Driver set active = 0 where userID = '$userID'");
		echo "status changed to inactive";
		}
		else
		{
		$reponse = $database->query("update Driver set active = 1  where userID = '$userID'");
		echo "status changed to active";
		}
}
}
else
{
	echo "User does not have a car";
}
mysqli_close($database);
?>
