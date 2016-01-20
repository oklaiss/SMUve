<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$postID = $_GET['postID']; #get my current user

$idQuery = mysqli_query($database, "SELECT id FROM Posts WHERE postID = '$postID'");
$returnedQueryArray = mysqli_fetch_assoc($idQuery);
$userID = $returnedQueryArray['id'];
$emailQuery = mysqli_query($database, "SELECT email FROM Users WHERE id = '$userID'");
$returnedQueryArray = mysqli_fetch_assoc($emailQuery);
$userEmail = $returnedQueryArray['email'];

$response = mysqli_query($database, "select * from Posts where postID = '$postID'");  // Query for the matching posts

if(mysqli_num_rows($response) > 0) {
  $finalArray = array();
  while($data = mysqli_fetch_assoc($response)) { //Loop through all the matching posts and start the JSON creation
    $tempArray = array(); // Clear the array for each iteration and add necessary info
    $tempArray["postID"] = $data['postID'];
    $tempArray["title"] = $data['title'];
    $tempArray["price"] = $data['price'];
    $tempArray["description"] = $data['description'];
    $tempArray["condition"] = $data['conditionOf'];
    $tempArray["category"] = $data['category'];
    $tempArray["email"] = $userEmail;

    //Get the URLS for the images associated with the post
	$QUERY = "SELECT image_url FROM Image_urls WHERE postID = " . $data['postID'];
    $urlQuery = $database->query($QUERY);
    $tempImgArray = array();
    while($row = mysqli_fetch_assoc($urlQuery)) { //Loop through all associated images for the postID
      array_push($tempImgArray, $row['image_url']);
    }

    //Compiling a JSON object and adding it to the main one to be returned
    $tempArray["images"] = $tempImgArray;
    array_push($finalArray, $tempArray);
  }

  echo json_encode($finalArray);
}
else {
  echo "NO MATCH";
  // echo "No post found with ID of $postID";
}

mysqli_close($database);


?>