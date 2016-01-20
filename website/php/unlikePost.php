<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);
	
$postID = $_POST['postID']; #get post id that was liked
$email = $_POST['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$idNum = $idNum[0];

$postQuery = mysqli_query($database, "DELETE FROM Liked_posts WHERE userID = '$idNum' AND postID = '$postID'");

$queryCheckNew = mysqli_query($database, "SELECT * FROM Liked_posts WHERE userID = '$idNum' AND postID = '$postID'");
$checkChange = mysqli_fetch_array($queryCheckNew);
echo $checkChange[0];
if($checkChange[0] != $idNum){
	echo "Valid";
}else{
	echo "unable to delete like post";
}


?>