var token = getCookie("token");

if (token != "") {
    DJDDZ.Init("canvas1");
} else
    window.location.replace(baseUrl + "/web/index.html");

const connection = new signalR.HubConnectionBuilder()
    .withUrl(baseUrl + "/gamews", { accessTokenFactory: () => token })
    .build();

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

start();