var sleep = require('./sleep');
var querystring = require('querystring');
var fs = require('fs');
var formidable = require("formidable");
var mine = require("./mine");

function resStatus(response, code, msg, contentType, writeType) {

    if (contentType == null) contentType = 'text/html';

    response.writeHead(code, {
        "Content-Type": contentType + ';charset=UTF-8',
    });

    if (writeType == null) response.write(msg);
    else response.write(msg, writeType);
    response.end();
}

function begin(response, urlRequest, request) {
    console.log('handler begin  was called');

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input name="text" /><br><br>' +
        '<input name="file_upload" type="file" /><br><br>' +
        '<input type="submit" value="Submit text" />'
        '</form>' +
        '</body>' +
        '</html>';

    resStatus(response, 200, body);
}

function upload(response, urlRequest, request) {
    // sleep.sleep(10000);
    console.log('handler upload was called');

    var form =new formidable.IncomingForm();
    // form.uploadDir='C:\\Users\\qii\\AppData\\Local\\Temp';
    // windows来说 跨磁盘rename是不允许的，会报错，所以这里设置upload路径，自己理解可能是他会把文件先从temp里移到这个路径里，然后上传的temp等价于就在这个路径了。然后再rename到相同的D盘中就没问题了
    form.uploadDir='D:\\wwwwwwwork\\node\\img';

    form.parse(request, function (error, fields, files){
        // console.log(error, fields, files);
        // console.log(files['file_upload'].path);

        // there is file input
        if (files['file_upload'].size != 0) {
            fs.renameSync(files['file_upload'].path,"./img/" + files['file_upload']['name']);
            var href = '<a href="/getimg?file=' + files['file_upload']['name'] + '" >' + files['file_upload']['name'] + '</a>';
            console.log(href);
        }
        else {
            console.log('no input files...');
            var href = 'no input files...';
        }

        href += '<br><br>postFields: <br>' + JSON.stringify(fields);

        resStatus(response, 200, href);
    });


    // resStatus(response, 200, 'this is from uploaddddddd handler,post data is <b>"' + postData + '"</b><br>' + querystring.parse(postData).text);
}

function getimg(response, urlRequest, request) {
    console.log('handler getimg was called');

    var fileName = querystring.parse(urlRequest.query).file;
    console.log(fileName);

    fs.readFile('./img/' + fileName, 'binary', function (error, fileContent){

        // console.log(error, fileContent);

        if (error) {
            resStatus(response, 404, error.toString());
        }
        else {
            // 文件后缀 后面需要根据后缀得到mine类型返回
            var pre = fileName.split('.')[1];
            resStatus(response,200, fileContent, mine.types[pre.toLowerCase()], 'binary');
        }
    });

    // resStatus(response, 200, img);
}

exports.begin = begin;
exports.upload = upload;
exports.getimg = getimg;
