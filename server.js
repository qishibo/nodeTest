var http = require('http');
var url  = require('url');

function start(route, handle)
{
    http.createServer(function(request, response){

        var postData = '';

        // request.setEncoding('utf8');

        // 自己建立数据接收的时间监听
        request.addListener('data', function (chunk){
            postData += chunk;
            console.log('receive chunk "' + chunk + '" ');
        });

        request.addListener('end', function(){
            console.log('post data received finished...');
            console.log(postData);
            // route.route(url.parse(request.url), handle, response, postData)
        });

        route.route(url.parse(request.url), handle, response, request);

        // console.log('connection coming...');
        // console.log(url.parse(request.url));
        // console.log(request, response);
        // response.writeHeader(200, {"Content-Type":"text/plain"});
        // response.write('hello world  ' + re);
        // response.end();
    }).listen(8888);

    console.log('begin listening on port 8888...');
}

// start();
exports.start = start;
