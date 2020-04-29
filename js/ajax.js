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
            url: "http://127.0.0.1:3005/loginUser/" + $("#loginsigninId").val() + "/" + $("#passwordigninId").val(),
            /*   data: JSON.stringify({
                   "login": $("#loginsigninId").val(),
                   "password": $("#passwordigninId").val(),

               }),*/
            statusCode: {
                200: function (data) {
                    $("#errorId").text(data["messageError"]);
                    if (data["register"]) {
                        $("#wrapper").css("display", "none");
                        $.ajax({
                            type: "GET",
                            contentType: "application/json",
                            dataType: "json",
                            url: "http://127.0.0.1:3005/getAllNotes/" + $("#loginsigninId").val(),

                            statusCode: {
                                200: function (data) {
                                    /*  $("#errorId").text(data["messageError"]);

                                      if(data["register"]){


                                          window.location.replace("./notes.php");
                                      }*/
                                    let dataResult="";
                                    $(".beloremepsum").css("display", "inline-flex");
                                    for (let i in data.notes) {
                                        $('#beloremepsum').append(' <div class="kaluteraturesom">');

                                        console.log(data.notes[i].theme);
                                        console.log(data.notes[i].message);
                                        dataResult += ' <div class="kaluteraturesom">'+'<h3 class="nagetap-kopulas">'+data.notes[i].theme+'</h3>'+
                                            '<p class="dinapiecd-esadsica">'+data.notes[i].message+'</p></div>'
                                         //   data.notes[i].theme + "<br>" + data.notes[i].message + "<br>";
                                    }
                                    $(".beloremepsum").html(dataResult);

                                }
                            },

                        });

                        // window.location.replace("./notes.php");
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
            url: "http://127.0.0.1:3005/addUser/",

            data: JSON.stringify({
                "login": $("#loginregId").val(),
                "email": $("#emailregId").val(),
                "password": $("#passwordregId").val(),
                "confirmPassword": $("#confirm_passwordregId").val(),
                "cookie": "test"

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

