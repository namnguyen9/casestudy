let manga = {} || manga;
manga.drawTable = function () {
    $.ajax({
        url: "http://localhost:3000/Mangaes",
        method: "GET",
        dataType: "json",
        success: function (data) {
            let i = 0;
            $.each(data, function (i, v) {
                $('#tbManga').append(
                    "<tr>" +
                    "<td>" + (i + 1) + "</td>" +
                    "<td>" + v.Name + "</td>" +
                    "<td><img src = '" + v.Avatar + "' width ='60px' height='80px' /></td>" +
                    "<td>" + v.Author + "</td>" +
                    "<td>" + v.PublicationDate + "</td>" +
                    "<td>" +
                    "<a href ='javascrip:;' title='Edit Manga' onclick='manga.get(" + v.id + ")'><i id ='Edit' class='fa fa-pencil-square'></i></a> " +
                    "<a href ='javascrip:;' title='Delete Manga' onclick='manga.delete(" + v.id + ")'><i  id='Delete' class = 'fa fa-trash-o'></i></a>" +
                    "</td>" +
                    "</tr>"
                );
            });
        }
    });
};

manga.operModal = function () {
    manga.reset();
    $('#addEditManga').modal('show');
};
manga.save = function () {
    if ($('#myForm').valid() && isNaN($("#Name").val()) && isNaN($("#Author").val())) {
        if ($('#id').val() == 0) {
            let mangaObj = {};
            mangaObj.Name = $("#Name").val();
            mangaObj.Avatar = $("#Avatar").val();
            mangaObj.Author = $("#Author").val();
            mangaObj.PublicationDate = $('#PublicationDate').val();
            $.ajax({
                url: "http://localhost:3000/Mangaes",
                method: "POST",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(mangaObj),
                success: function (data) {
                    $('#addEditManga').modal('hide');
                    manga.drawTable();
                }
            });

        }
        else {
            let mangaObj = {};
            mangaObj.Name = $("#Name").val();
            mangaObj.Avatar = $("#Avatar").val();
            mangaObj.Author = $("#Author").val();
            mangaObj.PublicationDate = $('#PublicationDate').val();
            mangaObj.id = $('#id').val();
            $.ajax({
                url: "http://localhost:3000/Mangaes/" + mangaObj.id,
                method: "PUT",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(mangaObj),
                success: function (data) {
                    $('#addEditManga').modal('hide');
                    manga.drawTable();
                }
            });
        }
    }
    else {
        manga.reset();
    }
};
manga.delete = function (id) {
    bootbox.confirm({
        title: "Remove Manga",
        message: "Do you want to remove this manga ?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if (result) {
                $.ajax({
                    url: "http://localhost:3000/Mangaes/" + id,
                    method: "DELETE",
                    dataType: "json",
                    success: function (data) {
                        manga.drawTable();
                    }
                });
            }
        }
    });
}
manga.get = function (id) {
    $.ajax({
        url: "http://localhost:3000/Mangaes/" + id,
        method: "GET",
        dataType: "json",
        success: function (data) {
            $('#Name').val(data.Name);
            $('#Avatar').val(data.Avatar);
            $('#Author').val(data.Author);
            $('#PublicationDate').val(data.PublicationDate);
            $('#id').val(data.id);
            let validator = $('#addEditManga').validate();
            validator.resetForm();
            $('#addEditManga').modal('show');
        }
    });
};
manga.reset = function () {
    $('#Name').val('');
    $('#Avatar').val('');
    $('#Author').val('');
    $('#PublicationDate').val('');
    $('#id').val('0');
    let validator = $('#addEditManga').validate();
    validator.resetForm();
}
manga.search = function () {
    $('#myTable').DataTable({
        destroy: true,
        columnDefs: [
            {
                "targets": [2, 5],
                "orderable": false
            }
        ]
    });
}


manga.init = function () {
    manga.drawTable();
};
$(document).ready(function () {
    manga.init();
});