function readyGame(token) {
    let param = {};

    pxmu.loading({
        close: false
    });
    $.ajax({
        url: baseUrl + "/Doudizhu?action=readyGame",
        data: JSON.stringify(param),
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("Authorization","Bearer " + token);
         },
        success: function (result, status, xhr) {
            if (result.msg == "") {
                console.log(result);            
            }
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