var baseUrl = "http://192.168.0.212:5050";
// var baseUrl = "http://192.168.1.52:5050";

// 设置cookie
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURI(value);
}

//获取cookie
function getCookie(name) {
    var cookiestr = document.cookie, //获取cookie,格式应该为"name=value; name0=value0"
        cookiearr0 = cookiestr.split(";"), //以"; "来分构字符串成数组 ["name=value","name0=value0"]
        cookiearr1 = [];
    for (var i = 0; i < cookiearr0.length; i++) {
        cookiearr1 = cookiearr0[i].split("="); //以"="分构字符串为数组,["name","value"]
        if (cookiearr1[0] == name) { //如果找到相同名称的cookie,返回它的值
            return decodeURI(cookiearr1[1]);
        }
    }
    return ""; //如果没有找到相同名的cookie,返回空
}

//删除cookie
function removeCookie(name) {
    setCookie(name, "", -1); //把过期时间设为昨天，即删除了当前cookie
}