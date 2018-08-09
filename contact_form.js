$(document).ready(function(){  
    $("#submit").click(function(){
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var contact = $("#contact").val();
        var sms ="";
        const uri = 'http://eterenalsouls.com/api/Account/sendsms'; //SECADMIN domain url
        $("#returnmessage").empty(); //To empty previous error/success message.
        
    //checking for blank fields	
    if(name==''||email==''||contact=='')
    {
       alert("Please Fill Required Fields"); 
    }
        else{
            $('#loader').css("display", "block");
            $('.submit').prop('disabled', true);
            $.ajax({
                type: "GET",
                url: "sms.xml",
                async:false,
                success: function(response) {
                    sms = xmlToString(response);
                    sms = sms.replace("#Name#",name);
                    sms = sms.replace("#Mobile#",contact);
                    sms = sms.replace("#Email#",email);
                    sms = sms.replace("#Enquiry#",message);
                    $.ajax({
                        url: uri,
                        type: 'POST',
                        ContentType: 'application/json',
                        data: '='+sms,
                        success: function(response) {
                            $('#loader').css("display", "none");
                            $('#returnText').html("<h3>Contact Form Submitted!</h2>")
                            .append("<p>We will be in touch soon.</p>")
                            .hide()
                            .fadeIn(1500, function() {
                                $('#returnText').append("<img id='checkmark' src='https://png.icons8.com/ultraviolet/50/000000/ok.png' />");
                                $("#form")[0].reset();//To reset form fields on success  
                            });
                            $('#returnText').delay(3000).fadeOut();
                            $('.submit').prop('disabled', false);    
                        },
                        error : function (xhr, ajaxOptions, thrownError){  
                            console.log(xhr.status);          
                            console.log(thrownError);
                            $('#loader').css("display", "none");
                        }
                    });
                    // $.ajax({
                    //     type: "POST",
                    //     url: "http://sms.quarkstech.com/api/postsms.php",
                    //     data: sms,
                    //     contentType: "text/xml",
                    //     success: function(response) {
                    //     $('#returnText').html("<h2>Contact Form Submitted!</h2>")
                    //     .append("<p>The transaction Id is :"+response+".We will be in touch soon.</p>")
                    //     .hide()
                    //     .fadeIn(1500, function() {
                    //         $('#returnText').append("<img id='checkmark' src='https://png.icons8.com/ultraviolet/50/000000/ok.png' />");
                    //         $("#form")[0].reset();//To reset form fields on success  
                    //     });
                    //     },
                    //         error : function (xhr, ajaxOptions, thrownError){  
                    //         console.log(xhr.status);          
                    //         console.log(thrownError);
                    //     }
                    // });
                },
                error:function(xhr, ajaxOptions, thrownError){
                    console.log(xhr.status);          
                    console.log(thrownError);
                    alert("Something went wrong. Please try again.");
                    $('#loader').css("display", "none");
                }
            });
        }
    });
});
function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
} 