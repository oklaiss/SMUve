$(document).ready(function() {

  if(sessionStorage.email != undefined && sessionStorage.email != null && sessionStorage.email != ""){
		// $("#navbarform").html(sessionStorage.email);
    document.getElementById("loginSignupBlock").style.display = "none";
	  document.getElementById("myAccountBlock").style.display = "block";
	  document.getElementById("loginHeader").style.display = "none";
	  document.getElementById("myAccountHeader").style.display = "block";

  }
  else if(sessionStorage.email == "" || sessionStorage.email == null){
		document.getElementById("loginSignupBlock").style.display = "block";
		document.getElementById("myAccountBlock").style.display = "none";
		document.getElementById("loginHeader").style.display = "block";
		document.getElementById("myAccountHeader").style.display = "none";
  }

  //This fires when a user attempts to log in (already have an account created)
  $("#submitLogin").click(function() {
    var email = document.getElementById("eid").value;
    var password = document.getElementById("passwd").value;
    console.log("login called");
    $.ajax({
      url: "php/checklogin.php",
      method: "POST",
      data: {
        "email": email,
        "password": password
      },
      success: function(response) {
        if(response == "Valid") {
          //alert("Successfully Logged In");
          sessionStorage.email = email;
          console.log(sessionStorage.email);
          // $("#navbarform").html(sessionStorage.username);
          window.location.href = "/search.html";
        }
        else {
          alert("Invalid email/password");
		      $('#LoginSignUpModal').modal('show');
        }
      }
    });

    return false;
  });


});

$("#viewItems").click(function() {
	if(sessionStorage.email != undefined && sessionStorage.email != null && sessionStorage.email != ""){
		window.location.href = "/search.html";
	}else if(sessionStorage.email == "" || sessionStorage.email == null){
		window.location.href = "/ListingsForNonUsers.html";
	}
    return false;
});
