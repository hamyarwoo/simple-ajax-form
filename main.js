/** jquery validator */
if (typeof jQuery.validator === "function") {
    jQuery.validator.addMethod("nationalId", function (value, element, input) {
        if (value.length == 0)
            return true;
        return Services.checkNationalId(value);
    });
    jQuery.validator.addMethod("irMobile", function (value, element) {
        return this.optional(element) || /^(\+98|0)?9\d{9}$/.test(value);
    });
    jQuery.validator.addMethod("irTel", function (value, element) {
        return this.optional(element) || /^(\0)?[0-9]{2}\d{9}$/.test(value);
    });
    jQuery.validator.addMethod("minPrice", function (value, element, input) {
        const price = Services.removeCommaString(value);
        return (price < input) ? false : true;
    });
    jQuery.validator.addMethod("maxPrice", function (value, element, input) {
        const price = Services.removeCommaString(value);
        return (price > input) ? false : true;
    });
    jQuery.validator.addMethod("checkPassword", function (password, element) {
        if (password.length > 0) {
            if (password.length >= 8) {
                const pat1 = /[a-zA-Z]/;
                if (pat1.test(password)) {
                    const pat2 = /[0-9]/;
                    return pat2.test(password);
                }
            }
            return false;
        }
        return true;
    });
    jQuery.extend(jQuery.validator.messages, {
        required: "وارد کردن فیلد الزامی است",
        remote: "لطفا این فیلد را اصلاح کنید",
        email: "لطفا یک آدرس ایمیل معتبر وارد کنید.",
        url: "لطفا یک نشانی معتبر وارد کنید",
        date: "لطفا یک تاریخ معتبر وارد کنید.",
        dateISO: "لطفا یک تاریخ معتبر (ISO) را وارد کنید.",
        number: "لطفا یک شماره معتبر وارد کنید.",
        digits: "لطفا فقط رقم را وارد کنید",
        creditcard: "لطفا یک شماره کارت اعتباری معتبر وارد کنید.",
        equalTo: "لطفا مجددا همان مقدار را وارد کنید.",
        accept: "لطفا یک مقدار با یک پسوند معتبر وارد کنید",
        maxlength: jQuery.validator.format("لطفا حداکثر {0} نویسه را وارد کنید"),
        minlength: jQuery.validator.format("لطفا حداقل {0} نویسه را وارد کنید"),
        rangelength: jQuery.validator.format("لطفا یک مقدار بین {0} و {1} حرف طولانی وارد کنید"),
        range: jQuery.validator.format("لطفا یک مقدار بین {0} و {1} را وارد کنید."),
        max: jQuery.validator.format("لطفا یک مقدار کمتر یا برابر {0} را وارد کنید."),
        min: jQuery.validator.format("لطفا یک مقدار بزرگتر یا برابر {0} را وارد کنید."),
        irMobile: "شماره تلفن همراه را به صورت صحیح وارد کنید",
        irTel: "شماره تلفن ثابت را به صورت صحیح وارد کنید",
        minPrice: jQuery.validator.format("لطفا یک مقدار بزرگتر یا برابر {0} را وارد کنید."),
        maxPrice: jQuery.validator.format("لطفا یک مقدار کمتر یا برابر {0} را وارد کنید."),
        nationalId: 'کد ملی را به صورت صحیح وارد کنید',
        checkPassword: 'رمز عبور باید شامل اعداد و حروف و حداقل 8 کاراکتر باشد',
    });

    jQuery.validator.setDefaults({
        errorElement: 'span',
        errorClass: "invalid-tooltip",
        highlight: function (element, errorClass, validClass) {
            parent_in_group = $(element).parents('.input-group');
            if (parent_in_group.length > 0) {
                parent_in_group.addClass('has-error');
            } else {
                if ($(element).hasClass("select2")) {
                    $(element).parents('.form-group').find('.select2-selection--single').addClass('has-error');
                    ;
                } else {
                    $(element).parents('div.form-group').addClass('has-error');
                }

            }
        },
        unhighlight: function (element, errorClass, validClass) {
            parent_in_group = $(element).parents('.input-group');
            if (parent_in_group.length > 0) {
                parent_in_group.removeClass('has-error');
            } else {
                if ($(element).hasClass("select2")) {
                    $(element).parents('.form-group').find('.select2-selection--single').removeClass('has-error');
                    ;
                } else {
                    $(element).parents('div.form-group').removeClass('has-error');
                }
            }
        },
        errorPlacement: function (error, element) {
            type = $(element).attr("type")
            error.addClass("invalid-feedback");
            parent_in_group = $(element).parents('.input-group');
            if (type == "radio") {
                error.insertAfter($(element).parents('.form-group'));
            } else if (type == 'checkbox') {
                error.insertAfter($(element).parents('.checkbox'));
            } else {
                if (parent_in_group.length > 0) {
                    error.insertAfter(parent_in_group);
                } else {
                    error.insertAfter(element);
                }
            }
        },
    });
}


$('.app_form button').on("click", function (e) {
    e.preventDefault();
    $("#frm-login").validate({
        rules: {
            mobile: {irMobile: true}
        },
    });
    var valid = $(".app_form").valid();


    if (valid == true) {
        $(this).find("i").hide();
        $(this).append('<i class="fa fa-spinner fa-spin"></i>');

        var form = $(this).parents("form");
        var formAction = form.attr("action");
        var method = form.attr("method");
        var data = form.serializeArray();

        handleAjax(formAction, method, data, function () {

            //success operation here
            msg = data.msg;
            $('.ajax-alert').addClass("alert");
            $('.ajax-alert').removeClass("alert-danger");
            $('.ajax-alert').addClass("alert-success");
            $('.ajax-alert').slideDown(300);
            setTimeout(function () {
                $('.ajax-alert').slideUp(300);
            }, 10000);

        }, function () {

            //error operation here
            $('.ajax-alert').removeClass("alert-success");
            $('.ajax-alert').addClass("alert");
            $('.ajax-alert').addClass("alert-danger");

            $('.ajax-alert').slideDown(300);
            setTimeout(function () {
                $('.ajax-alert').slideUp(300);
            }, 10000);

        });


    }
});

function closeAlertMSG(tag) {
    $(tag).parents(".alert").slideUp();
}

function handleAjax(formAction, method, data, success, error) {
    $.ajax({
        url: formAction,
        method: method,
        dataType: 'json',
        data: data,

        success: function (data) {

            $('.submit_icon').show();
            $('.fa.fa-spinner.fa-spin').hide();
            if (data.next_url) {
                document.location.href = data.next_url;
            }
            msg = data.msg;
            $('.ajax-alert .msg').html(msg);
            success();

        },
        error: function (data) {
            $('.submit_icon').show();
            $('.fa.fa-spinner.fa-spin').hide();
            var msg = data.responseJSON.msg[0];
            $('.ajax-alert .msg').html(msg);
            error();
        }
    });
}
