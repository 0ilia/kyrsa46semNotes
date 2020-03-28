$(document).ready(function () {


    $("#buttonSubmitSigninFormID").click(function (e) {
        e.preventDefault();
        $.ajax({
            url: "/php/login.php",
            type: "POST",
            data: $("#signinFormId").serialize(),
            success: function (data) {

                if (data === "Вы вошли") {
                    document.location.href = '/';
                    $("#loginsigninId").val("");
                    $("#passwordigninId").val("");
                } else {

                    $('#errorId').html(data);
                }
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


                if (data === "Вы зарегистрированы") {
                    document.location.href = '/';
                    $("#loginregId").val("");
                    $("#emailregId").val("");
                    $("#confirm_passwordregId").val("");
                    $("#passwordregId").val("");
                }else {
                    $('#errorId').html(data);

                }

            }
        });
    });
});

