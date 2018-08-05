$(document).ready(function(){  
    $("#submit").click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var contact = $("#contact").val();
        var sms ="";
        $("#returnmessage").empty(); //To empty previous error/success message.
    //checking for blank fields	
    if(name==''||email==''||contact=='')
    {
       alert("Please Fill Required Fields"); 
    }
        else{
            $.ajax({
                type: "GET",
                url: "sms.xml",
                async:false,
                success: function(response) {
                    sms = response.replace("#Name#",name);
                    sms = sms.replace("#Mobile#",contact);
                    sms = sms.replace("#Email#",email);
                    sms = sms.replace("#Enquiry#",message);
                    $.ajax({
                        type: "POST",
                        url: "http://sms.quarkstech.com/api/postsms.php",
                        data: sms,
                        contentType: "text/xml",
                        success: function(response) {
                        $('#returnText').html("<h2>Contact Form Submitted!</h2>")
                        .append("<p>The transaction Id is :"+response+".We will be in touch soon.</p>")
                        .hide()
                        .fadeIn(1500, function() {
                            $('#returnText').append("<img id='checkmark' src='https://png.icons8.com/ultraviolet/50/000000/ok.png' />");
                            $("#form")[0].reset();//To reset form fields on success  
                        });
                        },
                            error : function (xhr, ajaxOptions, thrownError){  
                            console.log(xhr.status);          
                            console.log(thrownError);
                        }
                    });
                }
            });
        }
    });
});