$(document).ready(function () {


    $("#buttonSubmitUpdateNotesID").click(function (e) {
        e.preventDefault();
        $.ajax({
            type: "put",
            contentType: "application/json",
            dataType: "json",
            url: "https://sequelizerestapi.herokuapp.com/updateNote/"+$("#IdIdNoteUpdate").val(),
            data: JSON.stringify({
                "theme": $("#themeIdNoteUpdate").val(),
                "message": $("#messageIdNoteUpdate").val()

            }),
        });
    });
});