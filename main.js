$('.app_form button').on("click", function (e) {
    $(".app_form").validate();
    e.preventDefault();
    $(this).find("i").attr("class", "");
    $(this).find("i").addClass("fa fa-spinner fa-spin");
    
    var form = $(this).parents("form");
    var formAction = form.attr("action");
    var method = form.attr("method");
    var data =form.serializeArray();

    handleAjax(formAction,method,data,function () {

        //success operation here
        msg = data.msg;
        $('.ajax-alert').addClass("alert");
        $('.ajax-alert').removeClass("alert-danger");
        $('.ajax-alert').addClass("alert-success");

        $('.ajax-alert').slideDown(300);
        setTimeout(function () {
            $('.ajax-alert').slideUp(300);
        }, 10000);

    },function () {

        //error operation here
        $('.ajax-alert').removeClass("alert-success");
        $('.ajax-alert').addClass("alert");
        $('.ajax-alert').addClass("alert-danger");

        $('.ajax-alert').slideDown(300);
        setTimeout(function () {
            $('.ajax-alert').slideUp(300);
        }, 10000);

    });
});


function handleAjax(formAction,method,data,success,error) {
   $.ajax({
        url: formAction,
        method: method,
        dataType: 'json',

        data: data,

        success: function (data) {

            msg = data.msg;
            $('.ajax-alert .msg').html(msg);
            success();

        },
        error: function (data) {
            var msg = data.responseJSON.msg[0];
            $('.ajax-alert .msg').html(msg);
            error();
        }
    });
}
