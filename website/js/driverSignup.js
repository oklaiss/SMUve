$(document).ready(function() {
	
	if(sessionStorage.email == "" || sessionStorage.email == null){
	   window.location.href = "/";
	   console.log(sessionStorage.email);
	}

	$("#apply").click( function(e) {
		var phoneNumber = $("#phone_number").val().replace(/\D/g,'');
		var model = $("#model").val();
		var year = $("#year").val().replace(/\D/g,'');
		var extraInfo = $("#extra_info").val();
		var canStore = $("#yes").is(":checked") ? true : false;
		var liabilityChecked = $("#release").is(":checked") ? true : false;
		var user_email = sessionStorage.email;
		 // alert(liabilityChecked);
		 // alert(phoneNumber.length);
		 // alert(model);
		 // alert(year.length);

		if(liabilityChecked == true && phoneNumber.length == 10 && model != "" && model != null && year.length == 4)
		{
				console.log(phoneNumber);
				console.log(model);
				console.log(year);
				console.log(extraInfo);
				console.log(canStore);
				console.log(liabilityChecked);
				//alert(liabilityChecked + phoneNumber.length + model + year.length);
				// alert("ALL DATA VALID");

				$.ajax({
					type: "POST",
					url: "php/postDrivers.php",
					//datatype : "json",
					async:false,
					data : {"phoneNumber":phoneNumber,
							"model":model,
							"year":year,
							"extraInfo": extraInfo,
							"canStore":canStore,
							"email":user_email
						},
					success : function(response) { console.log(response);
					window.location.href("/smuverDashboard.html"); },
					{
						alert("failed to contact PHP");
						//e.preventDefault();
					}
				});
		}
		else
		{
			e.preventDefault();
			if(liabilityChecked == false){
				//alert("They didn't release liability");
				//alert("They didn't release liability");
				$("#release_warning").css("display","inline-block");
			}
			else
				$("#release_warning").css("display","none");

			if(phoneNumber.length != 10){
				//alert("Enter a valid phoneNumber");
				//alert("Enter a valid phoneNumber");
				$("#phone_warning").css("display","inline-block");
			}
			else $("#phone_warning").css("display","none");

			if(year.length != 4){
				//alert("Enter a valid year");
				//alert("Enter a valid year");
				$("#year_warning").css("display","inline-block");
			}
			else  $("#year_warning").css("display","none");

			if(model == ""){
				$("#model_warning").css("display","inline-block");
			}
			else $("#model_warning").css("display","none");

			//return false;
		}

	});
});