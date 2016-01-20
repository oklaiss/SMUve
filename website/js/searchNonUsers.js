var activePosts = [];
var activeCount = 0;
$(document).ready( function(){
	activeCount = 0;
	activePosts = [];
	var user_email = sessionStorage.email;
	$.ajax({
			type: "GET",
			url: "php/getAllActivePosts.php",
			data: {},

			success: function(response) {
				console.log(response);
				
				response = $.parseJSON(response);
				
				$.each(response, function(x, item){
					activePosts[activeCount] = item.postID;
					
					activeCount += 1;
					for(var v = 0; v < activeCount; v++){
						console.log(activePosts[v]);
					}
				});
			},
	});
	$("#searchButton").click( function() {

		//var results = document.getElementById('results');
		var results = $('#results');

		var listing = '';

		var part1 = '<div class="col-sm-4 col-lg-4 col-md-4"><div class="thumbnail"><div class="thumbs"><img width="218px" height="160px" src="';
                                        //insert image link after this
    var part2 = '" alt="No Image"></div><div class="caption"><h4><a href="/posts/listing.html?id=';
                                        //insert link after this
    var part3 = '">';	//insert title after this
    var part4 = '</a></h4><h4 class="center">$';
                                        //insert price after this
    var part5 = '</h4></div></div></div>';

		var searchValue = $("#user_search").val();
		console.log("SEARCH VALUE IS: " + searchValue);

		//All are true by default. (meaning there are no filters)
		KitchenChecked = false;
		LivingRoomChecked = false;
		BedroomChecked = false;
		BathroomChecked = false;
		ElectronicsChecked = false;
		NewChecked = false;
		LikeNewChecked = false;
		GentlyUsedChecked = false;
		PoorChecked = false;
		BrokenAFChecked = false;

		//First block of filters - room
		if($("#Kitchen").is(":checked")){
			KitchenChecked = true;
		} else {
			KitchenChecked = false;
		}
		if($("#Living_Room").is(":checked")){
			LivingRoomChecked = true;
		} else {
			LivingRoomChecked = false;
		}
		if($("#Bedroom").is(":checked")){
			BedroomChecked = true;
		} else {
			BedroomChecked = false;
		}
		if($("#Bathroom").is(":checked")){
			BathroomChecked = true;
		} else {
			BathroomChecked = false;
		}
		if($("#Electronics").is(":checked")){
			ElectronicsChecked = true;
		} else {
			ElectronicsChecked = false;
		}

		//Second block of filters - condition
		if($("#New").is(":checked")){
			NewChecked = true;
		} else {
			NewChecked = false;
		}
		if($("#Like_New").is(":checked")){
			LikeNewChecked = true;
		} else {
			LikeNewChecked = false;
		}
		if($("#Gently_Used").is(":checked")){
			GentlyUsedChecked = true;
		} else {
			GentlyUsedChecked = false;
		}
		if($("#Poor").is(":checked")){
			PoorChecked = true;
		} else {
			PoorChecked = false;
		}
		if($("#Broken_AF").is(":checked")){
			BrokenAFChecked = true;
		} else {
			BrokenAFChecked = false;
		}

		$.ajax({
		  type: "POST",
		  url: "php/search.php",
		  data: { "searchValue": searchValue, //DO NOT CHANGE THE KEY NAMES!!!!!!!
							"filter" : [{
							"Kitchen": KitchenChecked,
							"LivingRoom": LivingRoomChecked,
							"Bedroom" : BedroomChecked,
							"Bathroom": BathroomChecked,
							"Electronics": ElectronicsChecked },
						{ "New": NewChecked,
							"LikeNew": LikeNewChecked,
							"GentlyUsed": GentlyUsedChecked,
							"Poor": PoorChecked,
							"BrokenShit": BrokenAFChecked }]},
		  success: function(data) {
				if(data === "NO MATCH") {
					$('#results').empty();
					alert("No results");
				}
				console.log(data);
				// dynamically fill search result content here
				data = $.parseJSON(data);
				//empty div of previous results
				// results.empty();
				$('#results').empty();
				$.each(data, function(i, item){
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
					for(var b = 0; b < activeCount; b++){
						if(item.id == activePosts[b]){
							results.append(listing);
						}
					}
					listing = "";
				});
			},
			error: function(data) {
				console.log(data.status);
				alert("ERROR OCCURED");
			}
		}); //Close AJAX function

	}); //Close on click function


}); //Close document ready function
// JavaScript Document
function nonUsersSignIn(){
	console.log("got here");
	alert("Please Login or Sign Up");
    $('#LoginSignUpModal').modal('show');
}

/*$("#logout").click(function() {
    alert("Please Login or Sign Up");
    window.location.href = "/signUp.html";
});
$("#logout").click(function() {
    alert("Please Login or Sign Up");
    window.location.href = "/signUp.html";
});
*/