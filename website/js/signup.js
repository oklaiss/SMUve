
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
console.log("signup loaded");

$(document).ready(function () {

	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});

	$(".next").click(function(){
		if(animating) return false;
		animating = true;
		console.log("next");

		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale('+scale+')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		},
		duration: 800,
		complete: function(){
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

// Handles creation of creating an account
$(".submit").click(function(){

	var errors = false;
	var firstname = $("#first").val();
	var lastname = $("#last").val();
	var email =  $("#email").val();
	var password = $("#pass").val();
	var passwordConfirmation = $("#passConf").val();
	var zipcode = $("#zip").val();
	var state = $("#state").val();


	//VALIDATION
	$("#errorlist").text(""); //Clear old errors so that new ones can be displayed
	$("#errorlist").attr("class", "well");
	var alphaRegex = new RegExp("^[A-Za-z]+$"); //Only allows characters to be in the expression
	var emailRegex = new RegExp("[^\\s]+@smu\\.edu");
	if(!firstname || !alphaRegex.test(firstname)){
		$("#errorlist").append("<li>Invalid input for first name</li>");
		errors = true;
	}
	if(!lastname || !alphaRegex.test(lastname)){
		$("#errorlist").append("<li>Invalid input for last name</li>");
		errors = true;
	}
	if(!email){
		$("#errorlist").append("<li>Email field cannot be empty</li>");
		errors = true;
	}
	//if(!emailRegex.test(email) && email) // Don't display this if the feild was left blank
		//$("#errorlist").append("<li>Must have @smu.edu email</li>");
		if(password.length < 8){
			$("#errorlist").append("<li>Password must be atleast 8 characters</li>");
			errors = true;
		}
		if(password != passwordConfirmation){
			$("#errorlist").append("<li>Passwords do not match</li>");
			errors = true;
		}
		if(zipcode.length < 5){
			$("#errorlist").append("<li>Invalid Zipcode</li>");
			errors = true;
		}
	// need to change state to dropdown form
	if(state.length < 2){
		$("#errorlist").append("<li>State cannot be empty</li>");
		errors = true;
	}
	if(errors == false){
		$("#errorlist").remove();
	}

	//VALIDATION

	if(errors == false) {
		var opts = {
  		lines: 13 // The number of lines to draw
		, length: 28 // The length of each line
		, width: 14 // The line thickness
		, radius: 42 // The radius of the inner circle
		, scale: 1 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0.25 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1 // Rounds per second
		, trail: 60 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '50%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: false // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
	}
	var target = document.getElementById('spinnerTarget')
	var spinner = new Spinner(opts).spin(target);


	$.ajax( {
		url: "php/verifyEmail.php",
		method: "POST",
		data: {"email": email},

		success: function(response){
			if(response=="Pass"){
				console.log("Email has been verified.");

				$.ajax( {
					url: "php/signup.php",
					method: "POST",
					data: {
						"firstname": firstname,
						"lastname": lastname,
						"email": email,
							"password": password, //Security concerns?
							"zipcode": zipcode,
							"state": state
						},
						success: function(response) {
							if(response == "bad") {
								console.log("Email already registered");
								alert("Sorry! That email is already registered to an account");
								window.location.href = "/signup.html";
								$("#errorlist").append("<li>Email already exists</li>");
							}
							else {
								// alert("Success! You have created an account");
								sessionStorage.email = email;
								console.log(sessionStorage.email);
								window.location.href = "/search.html";
							}
						}
					});
			}
			else {
				console.log("Email could NOT be verified");
				alert("Sorry, that is not a valid '@smu.edu' email address");
				window.location.href = "/signup.html";
			}
		},
		error: function(err){
			console.log("Error");
		}
	});
}


	return false; //Redirect to order screen
})

});
