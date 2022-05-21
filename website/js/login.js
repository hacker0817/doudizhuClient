var baseUrl = "http://192.168.0.212:5050";

$(function () {
    $("#register").on("click", function () {
        let name = $("#name").val();
        let pass1 = $("#pass1").val();
        let pass2 = $("#pass2").val();
        let email = $("#email").val();
        register(name, pass1, pass2, email);
    });

    $("#login").on("click", function () {
        let user = $("#user").val();
        let pass = $("#pass").val();
        login(user, pass);
    });
});

function register(name, password, repeatpwd, email) {
    if (name.trim() == "") {
        pxmu.fail("username cannot be empty");
        return;
    }

    if (password.trim() == "") {
        pxmu.fail("password cannot be empty");
        return;
    }
    if (password != repeatpwd) {
        pxmu.fail("the entered passwords are inconsistent");
        return;
    }

    if (email.trim() == "") {
        pxmu.fail("email cannot be empty");
        return;
    }

    let param = {
        name: name,
        password: password,
        email: email,
    };

    pxmu.loading({
        close: false
    });
    $.ajax({
        url: baseUrl + "/User?action=register",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result, status, xhr) {
            if (result.msg == "")
                pxmu.success("register success");
            else
                pxmu.fail(result.msg);
            pxmu.closeload(1000);
        },
        error: function (xhr, status, error) {
            pxmu.success("network error");
            pxmu.closeload(1000);
        },
    });
}

function login(name, password) {
    if (name.trim() == "") {
        pxmu.fail("username cannot be empty");
        return;
    }
    if (password.trim() == "") {
        pxmu.fail("password cannot be empty");
        return;
    }

    let param = {
        name: name,
        password: password,
    };

    pxmu.loading({
        close: false
    });
    $.ajax({
        url: baseUrl + "/User?action=login",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result, status, xhr) {
            if (result.msg == "")
                window.location.href = "./doudizhuClient/index.html";
            // pxmu.success("login success");
            else
                pxmu.fail(result.msg);
            pxmu.closeload(1000);
        },
        error: function (xhr, status, error) {
            pxmu.success("network error");
            pxmu.closeload(1000);
        },
    });
}