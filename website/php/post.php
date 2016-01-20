<?php
	
	$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
	if ($database->connect_errno)
		die("Connection failed: " . $database->connect_error);
	$email = $_POST['email'];
	$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
	$idNum = mysqli_fetch_row($queryID);
	$postsQuery = mysqli_query($database, "SELECT * FROM Posts WHERE id = '$idNum'");

	
	$finalArray = array();
	while($postID = mysqli_fetch_assoc($postsQuery)) { //Loop through all the matching posts and start the JSON creation
	  $tempArray = array(); // Clear the array for each iteration and add necessary info
	  $tempArray["postID"] = $postID['postID'];
	  $tempArray["description"] = $postID['description'];
	  $tempArray["title"] = $postID['title'];
	  $tempArray["price"] = $postID['price'];
	
	  //Get the URLS for the images associated with the post
	  $urlQuery = $database->query("SELECT image_url FROM Image_urls WHERE postID = " . $postID['postID']);
	  $tempImgArray = array();
	  while($row = mysqli_fetch_assoc($urlQuery)) { //Loop through all associated images for the postID
		array_push($tempImgArray, $row['image_url']);
		//echo "ID: " .$postID['postID'] . " URL: " . $row['image_url'] . "\n";
	  }
	
	  //Compiling a JSON object and adding it to the main one to be returned
	  $tempArray["images"] = $tempImgArray;
	  array_push($finalArray, $tempArray);
	}
	
	echo json_encode($finalArray);


	mysqli_close($database);
?>