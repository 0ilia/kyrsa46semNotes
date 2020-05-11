$(document).ready(function () {

    function deleteCookie(name) {
        document.cookie=name+"=''";
        document.cookie=name+"=''";
    }

    $("#exit").click(function () {
        deleteCookie("login");
        deleteCookie("password");
        document.location.replace("./");
    });
    function get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }

    if(get_cookie("login")!=="" && get_cookie("password")!=="") {

        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/loginUser/" + get_cookie("login") + "/" + get_cookie("password"),

            statusCode: {
                200: function (data) {
                    $("#errorId").text(data["messageError"]);
                    if (data["register"]) {

                        setInterval(function () {
                            $.ajax({
                                type: "GET",
                                contentType: "application/json",
                                dataType: "json",
                                url: "https://sequelizerestapi.herokuapp.com/getAllNotes/" +  get_cookie("login"),

                                statusCode: {
                                    200: function (data) {
                                        /*  $("#errorId").text(data["messageError"]);

                                          if(data["register"]){


                                              window.location.replace("./notes.html");
                                          }*/
                                        let dataResult="";
                                       // $(".beloremepsum").css("display", "inline-flex");
                                        for (let i in data.notes) {
                                            $('#beloremepsum').append(' <div class="kaluteraturesom">');
/*
                                            console.log(data.notes[i].theme);
                                            console.log(data.notes[i].message);*/
                                            dataResult += ' <div class="kaluteraturesom">'+'<div id="idNote">id: '+ data.notes[i].id+'</div><h3 class="nagetap-kopulas">'+data.notes[i].theme+'</h3>'+
                                                '<p class="dinapiecd-esadsica">'+data.notes[i].message+'</p></div>'
                                            //   data.notes[i].theme + "<br>" + data.notes[i].message + "<br>";
                                        }
                                        $(".beloremepsum").html(dataResult);

                                    }
                                },

                            });
                        },1000);


                        // window.location.replace("./notes.html");
                    }
                }
            },

        });
    }
});