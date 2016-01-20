<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$postID = _POST('postID');
$postQuery = mysqli_query($database, "SELECT * from Posts where postID = '$postID'");
$postNum = mysqli_num_rows($postQuery);
echo $postNum;

?>