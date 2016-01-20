$(document).ready( function() {


	if(sessionStorage.email == "" || sessionStorage.email == null){
	   window.location.href = "/";
	   console.log(sessionStorage.email);
	}

	userEmail = sessionStorage.email;

	table = $("#table_contents");

	//alert("dom ready");
	$.ajax(
	{
		type:"POST",
		url:"php/selectDrivers.php",
		data: {"email":userEmail},
		success: function(response){

			//alert(response);


			response =  $.parseJSON(response);

			$.each(response, function(i, item) {
				console.log(i);
				if(item.userID == null)
					$('#driver_list tr:last').after('<tr><td>' + item.phoneNum + '</td><td>' + item.vehicle_name + '</td></tr>');
				else
					if(item.active == 1)
					{
						$('#active').html("SET STATUS INACTIVE");	
					}
			});
		},
		error: function(exception){
			alert("exception");
		},
		//always
	});

	$("#active").click( function() {

		if($('#active').html() == "SET STATUS ACTIVE")
		{
			$('#active').html("SET STATUS INACTIVE");
			$.ajax({
				type:"POST",
				//async:false,
				url:"php/updateDriverActive.php",
				data: {"email":userEmail},
				success: function(response){ window.location.reload()},
				error: function(){alert("active button messed up");}
			});
		} 
		else
		{
			$('#active').html("SET STATUS ACTIVE");
			$.ajax({
				//async:false,
				type:"POST",
				url:"php/updateDriverActive.php",
				data: {"email":userEmail},
				success: function(response){window.location.reload()},
				error: function(){alert("inactive button messed up");}
			});

		}

	});
});



