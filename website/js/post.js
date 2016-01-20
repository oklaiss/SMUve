var postBox = [];
var numCheckboxes = 0;
var checkCheckbox = "0";
var activePosts = [];
var count = 0;
var user_email = sessionStorage.email;
var image = "inactive";
$(document).ready( function(){

		if(sessionStorage.email == "" || sessionStorage.email == null){
			window.location.href = "/";
			console.log(sessionStorage.email);
		}
		var user_email = sessionStorage.email;
		activePosts = [];
		count = 0;
		$.ajax({
				type: "GET",
				url: "php/getActivePosts.php",
				data: { "email": user_email },
	
				success: function(response) {
					console.log(response);
					
					response = $.parseJSON(response);
					
					$.each(response, function(x, item){
						activePosts[count] = item.postID;
						
						count += 1;
						for(var v = 0; v < count; v++){
							console.log(activePosts[v]);
						}
					});
				},
				complete: function(){
					getPosts();
				}
		});
		
}); //Close document ready function

function getPosts(){
		var results = $('#post_results');

		var listing = '';

		var part1 = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><div class="thumbs"><img width="218px" height="160px" src="';
                                        //insert image link after this
		var part2 = '" alt="No Image"></div><div class="caption"><h4><a href="/posts/listing.html?id=';
											//insert link after this
		var part3 = '">';	//insert title after this
		var part4 = '</a></h4><h4 class="center">$';
											//insert price after this
		var part5 = ' <a class = "btn btn-xs" onclick="addActive(';
		var part6 = ')" id = "';
		var part7 = '" value = "';
		var part8 = '">';
		var part9 = '</a></h4></div></div></div>';
		$.ajax({
		  type: "GET",
		  url: "php/getUserPosts.php",
		  data: { "email": user_email },
		  success: function(data) {
				// if(data === "NO MATCH") {
				// 	$('#results').empty();
				// 	alert("Error: no results");
				// }
				// dynamically fill search result content here
				data = $.parseJSON(data);
				//empty div of previous results
				// results.empty();
				$('#post_results').empty();
				$.each(data, function(i, item){
					listing = listing.concat(part1);
					listing = listing.concat(item.images[0]);
					listing = listing.concat(part2);
					//update with link here
					listing = listing.concat(item.postID);
					listing = listing.concat(part3);
					listing = listing.concat(item.title);
					listing = listing.concat(part4);
					listing = listing.concat(item.price);
					listing = listing.concat(part5);
					listing = listing.concat(item.postID);
					for(var a = 0; a < count; a ++){
						if(item.postID == activePosts[a]){
							console.log("got here");
							image = "active";
							checkCheckbox = "1";
						}
					}
					
					listing = listing.concat(part6);
					listing = listing.concat(item.postID);
					listing = listing.concat(part7);
					listing = listing.concat(checkCheckbox);
					listing = listing.concat(part8);
					listing = listing.concat(image);
					listing = listing.concat(part9);
					
					console.log(listing); 
					results.append(listing);
					listing = "";
					postBox[item.postID] = item.postID;
					numCheckboxes += 1;
					checkCheckbox = "0";
					image = "inactive";
				});
			},
			error: function(data) {
				console.log(data.status);
				alert("ERROR OCCURED");
			}
		}); //Close AJAX function
}
function addActive(a){
		var check = document.getElementById(postBox[a]).getAttribute("value");
		console.log(check);
		if(check == '0'){
				
				$.ajax({
		 			 url: "php/activatePost.php",
					 method: "POST",
					 data: { "email": sessionStorage.email, "postID": a},
					 success: function(response) {
						 if(response == "Valid"){
							 document.getElementById(postBox[a]).setAttribute("value", '1');
							 console.log("activated post");
							 location.reload();
						 }
						 else{
							 console.log(response);
						 }
					 }
				});
		} else if(check == '1'){
					
				$.ajax({
		 			 url: "php/unactivatePost.php",
					 method: "POST",
					 data: { "email": sessionStorage.email, "postID": a},
					 success: function(response) {
						 if(response == "Valid"){
							 document.getElementById(postBox[a]).setAttribute("value", '0');
							 console.log("unactivated post");
							 location.reload();
						 }
						 else{
							 console.log(response );
						 }
					 }
				});
		}
		

}