<?php

// set API Access Key
$access_key = 'e535a3748f44849003c6ddebcd166d07';
// set email address
$email_address =$_POST['email'];

// Initialize CURL:
$ch = curl_init('http://apilayer.net/api/check?access_key='.$access_key.'&email='.$email_address.'');  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Store the data:
$json = curl_exec($ch);
curl_close($ch);

// Decode JSON response:
$validationResult = json_decode($json, true);

// Access and use your preferred validation result objects
$validationResult['format_valid'];
$validationResult['smtp_check'];
$validationResult['score'];
$validationResult['domain'];

if($validationResult['format_valid'] && $validationResult['smtp_check'] && $validationResult['score']>=0.96 && $validationResult['domain']=="smu.edu")
	echo "Pass";
else
	echo "Fail";
?>