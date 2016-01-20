<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);
	
$postID = $_POST['postID']; #get post id that was liked
$email = $_POST['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$idNum = $idNum[0];

$postQuery = mysqli_query($database, "UPDATE Posts SET active= 0 WHERE postID = '$postID'");

$queryCheckNew = mysqli_query($database, "SELECT * FROM Posts WHERE id = '$idNum' AND postID = '$postID' AND active = 0");
$checkChange = mysqli_fetch_array($queryCheckNew);
if($checkChange[0] != $idNum){
	echo "Valid";
}else{
	echo "unable to delete like post";
}


?>