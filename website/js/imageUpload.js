$(document).ready(function() {

  $.cloudinary.config({ cloud_name: 'smuve-smu-undergraduate-project', api_key: '437847758464711'});

  //Attaches cloudinary listener to this form
  $('#imageUpload').append($.cloudinary.unsigned_upload_tag("bnoxw9s5",
      { cloud_name: 'smuve-smu-undergraduate-project'}))
      .bind('cloudinarydone', function(e, data) {
        showPic(data);
      });

    // $('#imageUpload > input').attr( {"style" : "display:none", "id" : "imageThing" } );
    $('#imageUpload').append(
      "<label for=\"imageThing\" id=\"labelForImageUpload\"></label>"
    );

    // $('#labelForImageUpload').attr("style", "color:red;font-size:45px");

});

function showPic(data) {
  $('#picture').append(
    $.cloudinary.image(data.result.public_id,
    { width: 150, height: 100,
      crop: 'thumb', effect: 'saturation:50' } ));
}
