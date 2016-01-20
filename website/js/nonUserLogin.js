$(document).ready(function() {
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
          alert("Successfully Logged In");
          sessionStorage.email = email;
          console.log(sessionStorage.email);
          // $("#navbarform").html(sessionStorage.username);
          window.location.href = "/search.html";
        }
        else {
          alert("Your email or password is terribly wrong");
        }
      }
    });

    return false;
  });
 

}); // JavaScript Document