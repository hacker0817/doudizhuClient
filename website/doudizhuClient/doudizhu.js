var token = getCookie("token");

console.log(token);
// Connect, using the token we got.
var connection = new signalR.HubConnectionBuilder()
    .withUrl("http://192.168.0.212:5050/gamews", { accessTokenFactory: () => token })
    .build();

console.log(connection);

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
    if (token != "") {
        readyGame(token);
        DJDDZ.Init("canvas1");
    } else
        window.location.replace(baseUrl + "/web/index.html");
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