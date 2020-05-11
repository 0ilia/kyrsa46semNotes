$(document).ready(function () {

    function get_cookie ( cookie_name )
    {
        var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );

        if ( results )
            return ( unescape ( results[2] ) );
        else
            return null;
    }
if(get_cookie("login")!==""&&get_cookie("password")!=="") {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        url: "https://sequelizerestapi.herokuapp.com/loginUser/" + get_cookie("login") + "/" + get_cookie("password"),

        statusCode: {
            200: function (data) {
                $("#errorId").text(data["messageError"]);
                if (data["register"]) {
                    document.cookie = "login" + $("#loginsigninId").val();
                    document.cookie = "password" + $("#passwordigninId").val();

                    document.location.replace("./notes.html?login=" +get_cookie("login") );

                }
            }
        },

    });
}
});