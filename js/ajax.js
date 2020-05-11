$(document).ready(function () {

    function get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }

    /*document.cookie = "user=John"; // обновляем только куки с именем 'user'
    alert(document.cookie);
    alert(get_cookie("user"));*/


    $("#buttonSubmitSigninFormID").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/loginUser/" + $("#loginsigninId").val() + "/" + $("#passwordigninId").val(),
            statusCode: {
                200: function (data) {
                    $("#errorId").text(data["messageError"]);
                    if (data["register"]) {
                        document.cookie = "login="+$("#loginsigninId").val();
                        document.cookie = "password="+$("#passwordigninId").val();

                        document.location.replace("./notes.html?login="+ $("#loginsigninId").val());

                    }
                }
            },

        });
    });

    $("#buttonSubmitregFormId").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/addUser/",

            data: JSON.stringify({
                "login": $("#loginregId").val(),
                "email": $("#emailregId").val(),
                "password": $("#passwordregId").val(),
                "confirmPassword": $("#confirm_passwordregId").val()

            }),

            statusCode: {
                200: function (data) {
                    $("#errorId").text(data["messageError"]);
                    if (data["register"]) {
                        $("#loginregId").val("");
                        $("#emailregId").val("");
                        $("#passwordregId").val("");
                        $("#confirm_passwordregId").val("");
                    }
                    // alert( JSON.parse(data));
                }
            },
            /* success: function (data) {


                 if (data === "Вы зарегистрированы") {
                     document.location.href = '/';
                     $("#loginregId").val("");
                     $("#emailregId").val("");
                     $("#confirm_passwordregId").val("");
                     $("#passwordregId").val("");
                 }else {
                     $('#errorId').html(data);

                 }

             }*/
        });
    });
});

