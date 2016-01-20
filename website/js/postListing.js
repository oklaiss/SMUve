var counter = 1;
var limit = 5;
var urlArray = [];

function addInput(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " items");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = '<input class="form-control wide-input" type="text" id="itemTitle" placeholder="Item Title" /><h3 class="fs-subtitle">Item Description:</h3><textarea class="form-control" rows="4" id="itemDescription"></textarea><h3 class="fs-subtitle">Select the condition of this item:</h3><label class="radio-inline"><input type="radio" id="condition">New</label><label class="radio-inline"><input type="radio" id="condition">Like New</label><label class="radio-inline"><input type="radio" id="condition">Gently Used</label><label class="radio-inline"><input type="radio" id="conditino">Poor</label><label class="radio-inline"><input type="radio" id="condition">Broken Shit</label><h3 class="fs-subtitle"></h3>';
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}

$(document).ready(function() {

  if(sessionStorage.email == "" || sessionStorage.email == null){
    window.location.href = "/";
    console.log(sessionStorage.email);
  }

  $.cloudinary.config({ cloud_name: 'smuve-smu-undergraduate-project', api_key: '437847758464711'});

  $('#imageUpload').append($.cloudinary.unsigned_upload_tag("bnoxw9s5",
      { cloud_name: 'smuve-smu-undergraduate-project'}))
      .bind('cloudinarydone', function(e, data) {
        urlArray.push(data.result.url); //Image URL
        $('#picture').append(
          $.cloudinary.image(data.result.public_id,
          { width: 150, height: 100,
            crop: 'thumb', effect: 'saturation:50' } ));
        console.log("upload stuff");
      });

  $("#imageForm:first-child").remove();

  // if(sessionStorage.username != undefined || sessionStorage.username != null)
	// 	$("#navbarform").html(sessionStorage.username);
  //This fires when a user attempts to log in (already have an account created)
  $("#submit").click(function() {
    var listingTitle = document.getElementById("title").value;
    var listingDescription = document.getElementById("description").value;
    // var myInputs = [];
    // $('input[name^="myInputs"]').each(function() {
    //   myInputs.push($(this).val());
    // })
    var listingPrice = document.getElementById("price").value;
    var listingRoom = $('input[name=r1]:checked').val();
    var listingCondition = $('input[name=r2]:checked').val();
    console.log("submit listing called");
    console.log(listingTitle);
    console.log(listingDescription);
    console.log(listingPrice);
    console.log(listingRoom);
    console.log(listingCondition);
    console.log(sessionStorage.email);
    $.ajax({
      url: "php/postListing.php",
      method: "POST",
      data: {
        "title": listingTitle,
        "description": listingDescription,
        "price": listingPrice,
        "category": listingRoom,
        "email" : sessionStorage.email,
        "condition" : listingCondition,
        "image_urls" : JSON.stringify(urlArray)
      },
      success: function(response) {
        if(response == "Valid") {
          alert("Successfully Posted Listing");
          window.location.href = "/post.html";
        }
        else {
          alert("Could not post");
          console.log(response);
        }
      }
    });

    return false;
  });


});
