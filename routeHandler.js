var sleep = require('./sleep');

function resOk(response, code, msg, type){
    if (type == null) type = 'text/html';

    response.writeHead(code,{"Content-Type":type});
    response.write(msg);
    response.end();
}

function begin(response, postData){
    console.log('handler begin  was called');

    var body ='<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+postData+
        '</form>'+
        '</body>'+
        '</html>';

    resOk(response, 200, body);
}

function upload(response, postData){
    // sleep.sleep(10000);
    console.log('handler upload was called');
    resOk(response, 200, 'this is from uploaddddddd handler,post data is <b>"' + postData + '"</b>');
}

exports.begin = begin;
exports.upload = upload;
