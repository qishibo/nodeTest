function route(urlRequest, handle, response, request){

	console.log('route to ' + urlRequest.pathname);

	if (typeof handle[urlRequest.pathname] == 'function') {
		handle[urlRequest.pathname](response, urlRequest, request);
	}
	else {
		console.log('no handlers to solve ' + urlRequest.pathname);
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write('haha, page not found');
		response.end();
	}

	// return urlRequest;
}

exports.route = route;
