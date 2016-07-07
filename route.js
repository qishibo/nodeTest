function route(pathName, handle, response, postData){

	console.log('route to ' + pathName);

	if (typeof handle[pathName] == 'function') {
		handle[pathName](response, postData);
	}
	else {
		console.log('no handlers to solve ' + pathName);
		response.writeHead(404, {"Content-Type":"text/plain"});
		response.write('haha, page not found');
		response.end();
	}

	// return pathName;
}

exports.route = route;
