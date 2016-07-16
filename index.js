var server = require('./server');
var route = require('./route');
var routeHandler = require('./routeHandler');

var handle = {
    '/': routeHandler.begin,
    '/begin': routeHandler.begin,
    '/upload': routeHandler.upload,
    '/getimg': routeHandler.getimg
};

console.log(server, route, handle);

server.start(route, handle);
