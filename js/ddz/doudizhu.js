var roomId = getCookie("roomId");
console.log("roomId:" + roomId);
var token = getCookie("token");

connection = new signalR.HubConnectionBuilder()
    .withUrl(baseUrl + "/gamews", {
        accessTokenFactory: () => token,
    })
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        JoinGame();
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

async function JoinGame() {
    try {
        await connection.invoke("JoinGame", roomId);
    } catch (err) {
        console.log(err);
    }
}

async function GameStart() {
    try {
        await connection.invoke("GameStart", gameInfo);
    } catch (err) {
        console.log(err);
    }
}

connection.onclose(() => {
    console.log("SignalR Closed.");
});

if (roomId != "") {
    start();


    DJDDZ.Init("canvas1");
} else {
    window.location.replace(httpUrl + "/web/index.html");
}
