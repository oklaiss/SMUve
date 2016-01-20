<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];
$imageUrls = $_POST['image_urls'];
$category = $_POST['category'];
$condition = $_POST['condition'];

$idQuery = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$returnedQueryArray = mysqli_fetch_assoc($idQuery);
$userId = $returnedQueryArray['id'];

$response = $database->query("INSERT INTO Posts (id, conditionOf, category, title, description, price, active)
                              VALUES ('$userId', '$condition', '$category', '$title', '$description', '$price', 1)");

$response = $database->query("SELECT postID FROM Posts WHERE id = $userId ORDER BY time DESC");
$postId = (mysqli_fetch_assoc($response)); //Get the most recent post id to associate it with all the iamge urls.
$postId = $postId['postID'];

//Insert into the image url table all the associated image urls.
$imageUrls = json_decode($imageUrls);
foreach($imageUrls as $url) {
  $response = $database->query("INSERT INTO Image_urls (postID, image_url) VALUES ('$postId', '$url')");
}

if($response != false) {
  echo "Valid";
}
else {
  echo "NOPE";
}

mysqli_close($database);
?>
