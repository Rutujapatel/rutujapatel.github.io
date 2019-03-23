jQuery(document).ready(function() {	
	/* Contact Form */
	if(jQuery('#contactform').length != 0){
		addForm('#contactform');
	}
	
	/* Quick Contact */
	if(jQuery('#quickcontact').length != 0){
		addForm('#quickcontact');
	}
	
	/* Blog Comments */
	if(jQuery('#replyform').length != 0){
		addForm('#replyform');
	}
});

	function addForm(formtype) {
	var formid = jQuery(formtype);
	var emailsend = false;
	
	formid.find("input[type=submit]").click(sendemail);
	
	
	function validator() {
		
		var emailcheck = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		var othercheck = /.{4}/;
		var noerror = true;
		
		formid.find(".requiredfield").each(function () {
													 
			var fieldname = jQuery(this).attr('name');
			var value = jQuery(this).val();
			if(value == "Name *" || value == "Email *" || value == "Message *"){
				value = "";	
			}

			if(fieldname == "email"){
				if (!emailcheck.test(value)) {
					jQuery(this).addClass("formerror");
					noerror = false;
				} else {
					jQuery(this).removeClass("formerror");
				}	
			}else{
				if (!othercheck.test(value)) {
					jQuery(this).addClass("formerror");
					noerror = false;
				} else {
					jQuery(this).removeClass("formerror");
				}	
			}
		})
		
		if(!noerror){
			formid.find(".errormessage").fadeIn();
		}
		
		return noerror;
	}
	
	function resetform() {
		formid.find("input").each(function () {
			if(!jQuery(this).hasClass("button")) jQuery(this).val("");	
		})
		formid.find("textarea").val("");
		emailsend = false;
	}
	

	function sendemail() {
		formid.find(".successmessage").hide();
		var phpfile = "";
		if(formtype=="#contactform"){
			phpfile = "forms/contact.html";
		}else if(formtype.lastIndexOf("c_")){
			phpfile = "forms/quickcontact.html";
		}else{
			phpfile = "";
		}
		if (validator()) {
			if(!emailsend){
				emailsend = true;
				formid.find(".errormessage").hide();
				formid.find(".sendingmessage").show();
				jQuery.post(phpfile, formid.serialize(), function() {
					formid.find(".sendingmessage").hide();
					formid.find(".successmessage").fadeIn();
					if(!formtype.lastIndexOf("c_"))resetform();
				});
			}
		} 
		return false
	}
}