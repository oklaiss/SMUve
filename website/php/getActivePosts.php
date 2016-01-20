<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$active = '1';
$email = $_GET['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$idNum = $idNum[0];

$response = mysqli_query($database, "SELECT * from Posts where id = '$idNum' AND active = 1");
if(mysqli_num_rows($response) > 0) { #loop through all the posts that the current user likes
	$finalArray = array();
	while($posts = mysqli_fetch_assoc($response)){
		$tempArray = array(); 
		$tempArray["postID"] = $posts['postID'];
		array_push($finalArray, $tempArray);
	}
	echo json_encode($finalArray);
}else{
	$finalArray = array();
	echo json_encode($finalArray);
}
mysqli_close($database);
?>