$(document).ready(function () {


    $("#buttonSubmitDeleteNotesID").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "delete",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/deleteNote/"+$("#IdIdNote").val(),


        });
    });
});