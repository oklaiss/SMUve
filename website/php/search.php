<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$searchValue = $_POST['searchValue'];

$queryString;
if(!empty($searchValue)) {
  $searchWords = explode(" ", $searchValue); // Split words by the space
  $totalWords = count($searchWords);
  $queryString = "SELECT * FROM Posts WHERE (";

  for($i = 0; $i < $totalWords; $i++) {
    $curWord = $searchWords[$i];
    $queryString =  $queryString . " description LIKE '%$curWord%' OR title LIKE '%$curWord%'";
    if($i != ($totalWords - 1)) {
      $queryString = $queryString . " OR";
    }
  }
  $queryString = $queryString . ")";
}
else {
  $queryString = "SELECT * FROM Posts WHERE 1=1"; // Do this so the below code will still work.
}


$rooms = $_POST['filter']; // Get all the room checked data
$rooms = $rooms[0];
$hasHadOne = false;
foreach($rooms as $key => $r) {
  if($r === "true") {
    if(!$hasHadOne) {
      $queryString = $queryString . " AND (category = '$key'";
      $hasHadOne = true;
    }
    else {
      $queryString = $queryString . " OR category = '$key'";
    }
  }
}


if($hasHadOne) {
  $queryString = $queryString . ")";
  $hasHadOne = false; // Prepare to loop through the conditions
}

$condition = $_POST['filter'];
$condition = $condition[1];
foreach($condition as $key => $r) {
  if($r === "true") {
    if(!$hasHadOne) {
      $queryString = $queryString . " AND (conditionOf = '$key'";
      $hasHadOne = true;
    }
    else {
      $queryString = $queryString . " OR conditionOf = '$key'";
    }
  }
}
if($hasHadOne) {
  $queryString = $queryString . ") AND (active=1)";
}

// echo $queryString;

//Create a json object with all the necessary info
$postsQuery = $database->query($queryString); // Query for the matching posts
if(mysqli_num_rows($postsQuery) > 0) {
  $finalArray = array();
  while($postID = mysqli_fetch_assoc($postsQuery)) { //Loop through all the matching posts and start the JSON creation
    $tempArray = array(); // Clear the array for each iteration and add necessary info
    $tempArray["postID"] = $postID['postID'];
    $tempArray["title"] = $postID['title'];
    $tempArray["price"] = $postID['price'];

    //Get the URLS for the images associated with the post
    $urlQuery = $database->query("SELECT image_url FROM Image_urls WHERE postID = " . $postID['postID']);
    $tempImgArray = array();
    while($row = mysqli_fetch_assoc($urlQuery)) { //Loop through all associated images for the postID
      array_push($tempImgArray, $row['image_url']);
    }

    //Compiling a JSON object and adding it to the main one to be returned
    $tempArray["images"] = $tempImgArray;
	$tempArray["id"] = $postID['postID'];
    array_push($finalArray, $tempArray);
  }

  echo json_encode($finalArray);
}
else {
  echo "NO MATCH";
}

mysqli_close($database);
?>
