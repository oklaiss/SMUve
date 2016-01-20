<?php

$database = mysqli_connect('localhost', 'root', 'password', 'smuve');
if ($database->connect_errno)
    die("Connection failed: " . $database->connect_error);

$email = $_GET['email'];
$idQuery = mysqli_query($database, "SELECT id, first_name, last_name, zip, state FROM Users WHERE email = '$email'");
$returnedQueryArray = mysqli_fetch_assoc($idQuery);
$first = $returnedQueryArray['first_name'];
$last = $returnedQueryArray['last_name'];
$zip = $returnedQueryArray['zip'];
$state = $returnedQueryArray['state'];

$returnArray = [
    "first" => $first,
    "last" => $last,
    "zip" => $zip,
    "state" => $state
  ];

  echo json_encode($returnArray);

?>
