<?php
$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_POST['email'];

$queryID = mysqli_query($database, "select id from Users where email = '$email'");

$idNum = mysqli_fetch_row($queryID);
$userID = $idNum[0];


$isActive = mysqli_query($database, "select * from Driver where userID = '$userID'");
$isActive = mysqli_fetch_assoc($isActive);

$response = mysqli_query($database, "select * from Driver");  // Query for the matching posts

//$getUsername = mysql_query($database, "select first_name from Users where id = '$data[userID]'");

if(mysqli_num_rows($response) > 0) {
  $finalArray = array();
  while($data = mysqli_fetch_assoc($response)) { //Loop through all the matching posts and start the JSON creation
    if($data['active'] == 1)
	{
	$tempArray = array(); // Clear the array for each iteration and add necessary info
	//$tempArray["userID"] = $data['userID'];
    $tempArray["phoneNum"] = $data['phoneNum'];
	$tempArray["vehicle_year"] = $data['vehicle_year'];
	$tempArray["vehicle_name"] = $data['vehicle_name'];
	$tempArray["active"] = $data['active'];
	
	  array_push($finalArray, $tempArray);
	  }
	}

	array_push($finalArray, $isActive);

  echo json_encode($finalArray);
}
else {
  echo "NO MATCH";
  // echo "No post found with ID of $postID";
}

mysqli_close($database);

?>
