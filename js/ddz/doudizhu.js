var token = getCookie("token");

if (token != "") {
    DJDDZ.Init("canvas1");
} else
    window.location.replace("http://192.168.0.212/web/index.html");