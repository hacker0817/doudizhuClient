var token = getCookie("token");

if (token != "") {
    DJDDZ.Init("canvas1");
} else
    window.location.replace(baseUrl + "/web/index.html");

const connection = new signalR.HubConnectionBuilder()
    .withUrl(baseUrl + "/gamews", {
        accessTokenFactory: () => token
    })
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
        SendMessageToServer("ready");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
}

connection.on("ReceiveMessage", (user, message) => {
    console.log(user);
    console.log(message);
});

connection.onclose(async () => {
    await start();
});

async function SendMessageToServer(message) {
    try {
        await connection.invoke("SendMessageToServer", message);
        console.log("SendMessageToServer.");
    } catch (err) {
        console.log(err);
    }
}

async function SendMessageToUser(user, message) {
    try {
        await connection.invoke("SendMessageToUser", user, message);
        console.log("SendMessageToUser.");
    } catch (err) {
        console.log(err);
    }
}

start();