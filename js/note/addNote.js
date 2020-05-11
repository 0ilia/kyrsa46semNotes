$(document).ready(function () {
    function get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }


    $("#buttonSubmitAddNotesID").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/addNote/",

            data: JSON.stringify({
                "login":get_cookie("login"),
                "theme": $("#themeIdNote").val(),
                "message": $("#messageIdNote").val(),

            }),

        });
    });

    });