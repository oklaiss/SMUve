$(document).ready(function() {

  if(sessionStorage.email == "" || sessionStorage.email == null){
    window.location.href = "/";
    console.log(sessionStorage.email);
  }

  $.ajax({
    url: "php/getAcctInfo.php",
    method: "GET",
    data: {
      "email": sessionStorage.email
    },
    success: function(response) {
      if(response){
      //json parsing here
        var res = jQuery.parseJSON(response);
        var space = " ";
        var names = res.first.concat(space).concat(res.last);
        $("#names").text(names);
        $("#zip").text(res.zip);
        $("#state").text(res.state);
      }
      else {
        alert("Database Error");
        console.log(response);
      }
    }
  });

  // if(sessionStorage.username != undefined || sessionStorage.username != null)
	// 	$("#navbarform").html(sessionStorage.username);
  //This fires when a user attempts to log in (already have an account created)
  $("#submit").click(function() {
    var curr_password = document.getElementById("curr_password").value;
    var new_password = document.getElementById("new_password").value;
    var new_password_conf = document.getElementById("new_password_conf").value;
    console.log("submit account info called");
    $.ajax({
      url: "php/editAcctInfo.php",
      method: "POST",
      data: {
        "email": sessionStorage.email,
        "curr_password": curr_password,
        "new_password": new_password,
        "new_password_conf": new_password_conf
      },
      success: function(response) {
        if(response == "Valid") {
          alert("Successfully Updated Account Info");
          window.location.href = "/search.html";
        }
        else if(response == "incorrectPassword"){
          alert("Incorrect Current Password");
          console.log(response);
        }
        else {
          alert("Could not update");
          console.log(response);
        }
      }
    });

    return false;
  });

  $("#logout").click(function() {
    console.log("logout called");
    sessionStorage.email = "";
    window.location.href = "/";
    return false;
  });


});
