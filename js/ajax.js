$(document).ready(function () {
/*

    $("#signinFormId").submit(function () {
        $.ajax({
            url: "/php/login.php",
            type: "POST",
            data: $("#signinFormId").serialize(),
            success: function (data) {
                $("#login").val("");
                $("#password").html(data);

                $('#errorId').html(data);
            }
        });
        event.preventDefault();
    });*/


    $("#buttonSubmitSigninFormID").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/php/login.php",
            type: "POST",
            data: $("#signinFormId").serialize(),
            success: function (data) {

                if(data==="Вы вошли"){
                    document.location.href = '/';
                }
                $("#login").val("");
                $("#password").val("");
                $('#errorId').html(data);
            }
        });
    });

    $("#buttonSubmitregFormId").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/php/signup.php",
            type: "POST",
            data: $("#regFormId").serialize(),
            success: function (data) {


                if(data==="Вы зарегистрированы"){
                    document.location.href = '/';
                }
                $("#login").val("");
                $("#email").val("");
                $("#confirm_password").val("");
                $("#password").val("");
                $('#errorId').html(data);
            }
        });
    });
});

