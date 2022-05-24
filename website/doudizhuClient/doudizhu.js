const connection = new signalR.HubConnectionBuilder().withUrl("http://192.168.1.52:5050/ws", options => {
    options.AccessTokenProvider = () => Task.FromResult("111");
}).configureLogging(signalR.LogLevel.Information).build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

connection.onclose(async() => {
    await start();
});

$(function() {
    var token = getCookie("token");
    if (token != "") {
        readyGame(token);
        DJDDZ.Init("canvas1");
    } else
        window.location.replace("http://192.168.0.212/web/index.html");
});

function readyGame(token) {
    let param = {};

    pxmu.loading({
        close: false,
    });
    $.ajax({
        url: baseUrl + "/Doudizhu?action=readyGame",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(result, status, xhr) {
            if (result.msg == "") {
                console.log(result);
                start();
            } else pxmu.fail(result.msg);
            pxmu.closeload(1000);
        },
        error: function(xhr, status, error) {
            pxmu.success("network error");
            pxmu.closeload(1000);
        },
    });
}