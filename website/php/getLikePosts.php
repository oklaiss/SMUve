<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];
$queryID = mysqli_query($database, "SELECT id FROM Users WHERE email = '$email'");
$idNum = mysqli_fetch_row($queryID);
$idNum = $idNum[0];
$response = mysqli_query($database, "SELECT * from Liked_posts where userID = '$idNum'"); #get all my user's liked posts

if(mysqli_num_rows($response) > 0) { #loop through all the posts that the current user likes
	$finalArray = array();
	while($posts = mysqli_fetch_assoc($response)){
		$postID = $posts['postID'];
		$postQuery = mysqli_query($database, "SELECT * from Posts where postID = '$postID'"); #get associated post information
		while($postCurr = mysqli_fetch_assoc($postQuery)) { //Loop through all the matching posts and start the JSON creation
			
			$tempArray = array(); // Clear the array for each iteration and add necessary info
			$tempArray["postID"] = $postCurr['postID'];
			$tempArray["title"] = $postCurr['title'];
			$tempArray["price"] = $postCurr['price'];
	
			//Get the URLS for the images associated with the post
			$urlQuery = $database->query("SELECT image_url FROM Image_urls WHERE postID = " . $postCurr['postID']);
			$tempImgArray = array();
			while($row = mysqli_fetch_assoc($urlQuery)) { //Loop through all associated images for the postID
				array_push($tempImgArray, $row['image_url']);
			}
			
			//Compiling a JSON object and adding it to the main one to be returned
			$tempArray["images"] = $tempImgArray;
		
			array_push($finalArray, $tempArray);
	 
		} 	
	}
	echo json_encode($finalArray);
}

mysqli_close($database);






?>