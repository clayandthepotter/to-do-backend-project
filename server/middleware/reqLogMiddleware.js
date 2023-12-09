// middleware to log request
const reqLogMiddleware = (req, res, next) => {
	// req.method: get, post, put, delete...  req.url: /api/users
	console.log(`Received ${req.method} request to ${req.url}`);
	console.log(req.headers);
	next();
};

module.exports = reqLogMiddleware;