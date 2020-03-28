$(document).ready(function () {
    $(".openRegForm").click(function () {
        $("#myReg").css("display", "block");
        $("#myAut").css("display", "none");

        $('#errorId').html("");

    });

    $(".openAuthForm").click(function () {
        $("#myAut").css("display", "block");
        $("#myReg").css("display", "none");

        $('#errorId').html("");

    });
});