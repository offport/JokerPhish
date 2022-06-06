// JavaScript Document

jQuery('document').ready(function() {
	initLoad();
	initButtonActions();

});

function initButtonActions() {
	
	jQuery.validator.setDefaults({
		  // where to display the error relative to the element
		  errorPlacement: function(error, element) {
			  error.appendTo(element.parent().find('div.myErrors'));
			 }
	});
	
	jQuery("#captchaText").val('');
	
	jQuery.validator.addMethod("loginRegex", function(value, element) {
      	  return this.optional(element) || /^[a-zA-Z0-9_\\-]+$/i.test(value);
	});
    
 	jQuery("#home").validate({
		rules: {
			// mandatory entry
			username: {
				 required: true,
				 loginRegex: true,
				 minlength: 2,
		         maxlength: 16
			},
			password: "required",
			captchaText: "required"
		},
		messages: {
			password: "Please enter mandatory field",
			captchaText: "Please enter mandatory field",
			username: {
				required: "Please enter mandatory field",
				alphanumeric: "Invalid Username",
				minlength: "Invalid Username",
				maxlength: "Invalid Username"
			}
            
        },
        // on page submit 
        submitHandler: function(form){
        	console.log("submitHandler");
        	jQuery('.myErrors').text(''); 
        	if (homeValidate()) {
        		console.log($("#home").validate().errorList);
        		//formEncript()
        		form.submit();
        	}
        },
        invalidHandler:function(form, validator) {
        	homeValidate()
        }
 });
  
 	/*jQuery('#continue').bind('click', function(e) {
 		 continueSubmit();
	});*/
 	
	/*jQuery('#clear').bind('click', function() {
		$('#step1 input[type=text]:not([disabled])').val('');
		$('#step1 input[type=password]:not([disabled])').val('');
		jQuery('.myErrors').text(''); 
	});*/
	
	/*jQuery('#refresh_kaptcha_chgpwd').bind('click', function() {
		getKaptcha('chgpwdkaptcha');
	});
	
	jQuery('#refresh_kaptcha_main').bind('click', function() {
		getKaptcha('mainkaptcha');
	});*/
}

var formEncript = function() {
	jQuery("#username").val(encript(jQuery("#username").val()));
	if (jQuery("#password").val() != '')
		jQuery("#password").val(encript(jQuery("#password").val()));
	else{
		/*var lenelVal = $("input[id^='lenelBox']:enabled").map(function() {
			return encript($(this).val());
			}).get();
		jQuery("#lenelValues").val(lenelVal);*/
	}
	
}

var encript = function(value) {
	var iv = "3ad5485e60a4fecde36fa49ff63817dc";
	var key = CryptoJS.MD5("0a948a068f5d4d8b9cc45df90b58d382d2b916c25822b6f74ea96fe6823132f4") ; 
	var encrypted = CryptoJS.AES.encrypt(jQuery('#username').val(), key, {
		iv : CryptoJS.enc.Hex.parse(iv),
		mode : CryptoJS.mode.CBC,
		padding : CryptoJS.pad.Pkcs7
	});
	var encryptedInHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
	return encryptedInHex.toUpperCase();
	};
	
function initLoad() {
	
	// disable kaptcha for the first 2 attempts
	if(jQuery("#noOfAttempts").val()<=1){
		jQuery("#kaptchaSection").hide();
	}
	localStorage.setItem("QRPM_CACHE_KEY", "YES");
	// focus on first error box
	jQuery('span.myErrors').filter(":visible:first").map(function(){
		jQuery(this).parent().find("input:visible:first").focus();
		return;
	});
	
	authenticationDispaly();
	$("input[id='captchaText']").val('');
	jQuery('#staff').change(function() {
		authenticationDispaly();
		jQuery("input[id^='lenelBox']:not([disabled])").val('');
	});
	
	jQuery('#type').change(function() {
		authenticationDispaly();
		/*if (jQuery(this).val() == 'activate') {
			console.log(jQuery(this).val() + "---" +jQuery('#staff').val());
			jQuery('.activateAc').show();
		} else if (jQuery('#staff').val() == 'no') {
			console.log(jQuery(this).val() + "---" +jQuery('#staff').val());
			jQuery('.activateAc').show();
		}else {
			console.log(jQuery(this).val() + "---" +jQuery('#staff').val());
			jQuery('.activateAc').hide();
		}*/
	});
	
	function authenticationDispaly() {
		jQuery("div.myErrors").empty();
		//jQuery("input[id^='lenelBox']:not([disabled])").val('');
		jQuery("input[id='password']:not([disabled])").val('');
		if (jQuery('#staff').val() == 'Y') {
			//console.log(jQuery('#staff').val());
			jQuery('#cardNum').show();
			jQuery('.activateAc').hide();
			jQuery('#password').prop('value', '');
			if(!jQuery("#type").find("option[value='Activate']").val())
				jQuery("#type").append($("<option></option>").attr("value","Activate").text("Unlock Account"));
		} else {
			//console.log(jQuery('#staff').val());
			jQuery('#cardNum').hide();
			jQuery('.activateAc').show();
			jQuery("#type option[value='Activate']").remove();
		}
		
		}
	// numbers and focus on next input box
/*	jQuery("input[id^='lenelBox']:enabled").keypress(function(evt) {
			var charCode = (evt.which) ? evt.which : event.keyCode;
			console.log(charCode+"keypress"+this.value);
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			if (this.value.length > 1) {
				return false;
			}
		});*/
	

	jQuery("input[id^='lenelBox']:enabled").keydown(function(e) {
		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [ 46, 8, 9, 27, 13, 110, 190 ]) !== -1	||
				// Allow: Ctrl+A, Command+A
				(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
				// Allow: home, end, left, right, down, up
				(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))	&& (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}else if (this.value.length > 0 ){
			$(this).val("")
		}
	});

	// numbers and focus on next input box
	jQuery("input[id^='lenelBox']:enabled").keyup(function(evt) {
		var charCode = (evt.which) ? evt.which : event.keyCode;
		var val = jQuery(event.target).val();
		console.log(evt.which +"=" +jQuery(event.target).val());
		if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {
			return false;
		}
		var length = this.value.length;
		if (length > 1) {
			var alValue = $(this).val().substring(length - 1, length);
			// console.log(alValue);
			$(this).val(alValue);
		}

		if (this.value < 0 || this.value > 9)
			return false;
		if (this.value.length > 0 && charCode != 16 && charCode != 9) {
			var txt = jQuery(event.target);

			var allOther = jQuery("input[type=text]:not([disabled])");
			var index = jQuery.inArray(txt[0], allOther);
			var next = jQuery(allOther[index + 1]);
			if (next)
				next.focus();
			jQuery('#cardNum [class*=myErrors ]').empty()
		}
	});
	
	// Alpha numerics
	jQuery("input[id='username']").keypress(function(evt) {
		var regex = new RegExp("^[a-zA-Z0-9_-]+$");
	    var str = String.fromCharCode(!evt.charCode ? evt.which : evt.charCode);
	    if (regex.test(str)) {
	        return true;
	    }
		return false;
	});
}



/*function initOtpValidation() {
	
	
	jQuery('#back').click(function() {
		jQuery('.steps').hide();
		jQuery('#step1').show();
	});
	jQuery('#submit').click(function() {
		jQuery('.steps').hide();
		jQuery('#step3').show();
		getKaptcha('chgpwdkaptcha');
	});
	jQuery('#finalSubmit').click(function() {
		jQuery('.steps').hide();
		jQuery('#success-msg').show();
	});
}
function enableRandomLenelBoxes() {
	var arr = []
	while (arr.length < 3) {
		var randomnumber = Math.ceil(Math.random() * 7)
		if (arr.indexOf(randomnumber) > -1)
			continue;
		arr[arr.length] = randomnumber;
		jQuery('#lenelBox' + randomnumber).prop('disabled', false);
		jQuery('#lenelBox' + randomnumber).prop('value', '');
	}
	jQuery('#lenelKey').val(arr.sort());
}
function defaultTheLenelBoxes() {
	for (var i = 1; i < 8; i++) {
		jQuery('#lenelBox' + i).prop('disabled', true);
		jQuery('#lenelBox' + i).prop('value', 'X');
	}
}
*/

function isNumberKey(object, evt) {
	//console.log("isNumberKey"+evt.which);
	if (object.value.length > 0)
		return false;
	jQuery('#cardNum [class*=myErrors ]').html("");
	var charCode = (evt.which) ? evt.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;
	return true;
}


function homeValidate() {
	console.log("Home page validation started ..."+jQuery("#staff").val());
	var lebelb = true;
	if (jQuery("#staff").val() == "Y") {
		jQuery("input[id^='lenelBox']:enabled:not([id='lenelBox7'])").each(function() {
			if ($(this).val() == "") {
				this.focus();
				jQuery('#cardNum div[class*=myErrors ]').html("Please enter mandatory field");
				return lebelb = false;
			}
		});
	}
	/*jQuery('input[type=text]:not([id^="lenelBox"])').each(function() {
		if ($(this).val() == "") {
			if (lebelb)
				this.focus();
			jQuery('#$(this.id) [class*=myErrors]').html("This field is required.");
			lebelb = false;
			return false;
		}
	});*/
	return lebelb;
}

function continueSubmit() {
	console.log("Submitting HomePage details...");
	jQuery('.myErrors').text(''); 
	/*var lenelVal = $("input[id^='lenelBox']:enabled").map(function() {return $(this).val();}).get().join();
	jQuery('#lenelValue').val(lenelVal);*/

	var dataToSend = JSON.stringify(getFormData(jQuery('#home')));
	//console.log(dataToSend);
	
	//jQuery("#home").validate();
	if (homeValidate()) {
		jQuery("#home").submit();
	}
	
	/*jQuery.ajax({
		url : "continueSubmit",
		type : 'POST',
		data : dataToSend,
		//dataType : 'json',
		contentType : "application/json; charset=utf-8",
		success : function(data) {
           // $('#result').html(data);
        },
        error: function(e){
        	//$('#result').html(e.responseText);
        	alert('Error: ' + e.responseText);
        }

	});
*/}
