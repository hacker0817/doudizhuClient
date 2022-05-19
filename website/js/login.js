var baseUrl = "http://192.168.1.52:5050";

$(function() {
    $("#register").on("click", function() {
        let name = $("#name").val();
        let pass1 = $("#pass1").val();
        let pass2 = $("#pass2").val();
        let email = $("#email").val();
        register(name, pass1, pass2, email);
    });
});

function register(name, password, repeatpwd, email) {
    if (password != repeatpwd) alert("密码不同！");

    let param = {
        name: name,
        password: password,
        email: email,
    };

    $.ajax({
        url: baseUrl + "/User?action=register",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            alert(err);
        },
    });
}

function login(name, password) {
    let param = {
        name: name,
        password: password,
    };

    $.ajax({
        url: baseUrl + "/User?action=login",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
            alert(err);
        },
    });
}