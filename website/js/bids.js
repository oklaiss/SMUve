var numCheckboxes = 0;
var likeBox = [];
var checkCheckbox = '1';
var likedPosts = [];
var count = 0;
var user_email = sessionStorage.email;
var image = "img/unlike.png";

$(document).ready( function(){

	if(sessionStorage.email == "" || sessionStorage.email == null){
		window.location.href = "/";
		console.log(sessionStorage.email);
	}
	likedPosts = [];
	count = 0;
	$.ajax({
			type: "GET",
			url: "php/getJustLikedPosts.php",
			data: { "email": user_email },

			success: function(response) {
				console.log(response);
				response = $.parseJSON(response);
				$.each(response, function(x, item){
					likedPosts[count] = item.postID;

					count += 1;
					for(var v = 0; v < count; v++){
						console.log(likedPosts[v]);
					}
				});
			},

	});
		
		var results = $('#results');

		var listing = '';

		var user_email = sessionStorage.email;

		var part1 = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><div class="thumbs"><img width="218px" height="160px" src="';
											//insert image link after this
		var part2 = '" alt="No Image"></div><div class="caption"><h4><a href="/posts/listing.html?id=';
											//insert link after this
		var part3 = '">';	//insert title after this
		var part4 = '</a></h4><h4 class="center">$';
											//insert price after this
		var part5 = '</h4></div></div></div>';


		$.ajax({
		  type: "POST",
		  url: "php/getLikePosts.php",
		  data: { "email": user_email },
		  success: function(response) {
			  	if(response === "NO MATCH") {
					$('#results').empty();
					alert("No results");
				}
			  	console.log(response);
				// dynamically fill search result content here
				response = $.parseJSON(response);
				//empty div of previous results
				$('#results').empty();
				$.each(response, function(i, item){
					
					console.log(item);
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
					results.append(listing);
					listing = "";
				});
			}
		}); //Close AJAX function
		



}); //Close document ready function
function addLike(a){
		var check = document.getElementById(likeBox[a]).getAttribute("value");
		console.log(check);
		if(check == '0'){
				document.getElementById(likeBox[a]).setAttribute("value", '1');
				document.getElementById(likeBox[a]).setAttribute("src", "img/like.png");
				
				$.ajax({
		 			 url: "php/likePost.php",
					 method: "POST",
					 data: { "email": sessionStorage.email, "postID": a},
					 success: function(response) {
						 if(response == "Valid"){
							 console.log("added liked post");
							 
						 }
						 else{
							 console.log(response );
						 }
					 }
				});
		} else if(check == '1'){
				document.getElementById(likeBox[a]).setAttribute("value", '0');
				document.getElementById(likeBox[a]).setAttribute("src", "img/unlike.png");
				$.ajax({
		 			 url: "php/unlikePost.php",
					 method: "POST",
					 data: { "email": sessionStorage.email, "postID": a},
					 success: function(response) {
						 if(response == "Valid"){
							 console.log("unliked post");
						 }
						 else{
							 console.log(response);
						 }
					 }
				});
		}
		
}