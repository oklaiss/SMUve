$(document).ready( function(){
	$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
	}

	console.log("this is the id");
	var id = $.urlParam('id');
	console.log(id);
	var dollar = "$";

	var underlay = $('#indicators_underlay')
	var underlay_text1 = '<li data-target="#myCarousel" data-slide-to="';
	var underlay_text2 = '"></li>';
	var underlay_result = '';

	var image_results = $('#carousel_list')
	var part1active = '<div class="item active"><img src="';
	var part1 = '<div class="item"><img src="';
	var part2 = '" alt="Item Image"></div>';
	var listing_result = '';
	var condition = '';
	var email = '';

	$.ajax({
		  type: "GET",
		  url: "../php/selectPostByID.php",
		  data: { "postID": id },
		  success: function(data) {
				if(data === "NO MATCH") {
					alert("No results for that ID");
				}
				console.log(data);
				// dynamically fill content here
				data = $.parseJSON(data);
				$('#listing_title').html(data[0].title);
				$('#listing_price').html(dollar.concat(data[0].price));
				$('#listing_description').html(data[0].description);
				if(data[0].condition == "BrokenShit"){
					condition = "broken";
				}
				else {
					condition = data[0].condition;
				}
				$('#listing_condition').html('Condition: ' + condition);
				$('#listing_category').html('Category: ' + data[0].category);
				$('#listing_email').html('Send Email: ' + '<a href="mailto:' + data[0].email+ '">' + data[0].email);
				for (i=0; i<data[0].images.length; i++){
					if (i == 0){
						listing_result = listing_result.concat(part1active);
					} else{
						listing_result = listing_result.concat(part1);
					}
					listing_result = listing_result.concat(data[0].images[i]);
					listing_result = listing_result.concat(part2);
					image_results.append(listing_result);
					listing_result = '';
				}
				for (r=1; r<data[0].images.length; r++) {
					underlay_result = underlay_result.concat(underlay_text1);
					underlay_result = underlay_result.concat(r.toString());
					underlay_result = underlay_result.concat(underlay_text2);
					underlay.append(underlay_result);
				}
			},
			error: function(data) {
				console.log(data.status);
				alert("ERROR OCCURED");
			}
		}); //Close AJAX call



}); //Close document ready function