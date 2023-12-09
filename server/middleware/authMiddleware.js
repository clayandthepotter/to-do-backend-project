// require JWT
const jwt = require('jsonwebtoken');

// load and store our JWT secret key
const secretKey = process.env.JWT_SECRET

// impliment middleware for JWT authentication
// make function seperately, and then pass to app.use
const authMiddleware = (req, res, next) => {
	// req: request, res: response, next: next function
	// extract token from request headers
	const token = req.headers['authorization'];
	// if token is present,
	if (token) {
		// verify token with "verify" method which checks if token is valid and not expired
		jwt.verify(token, secretKey, (err, decoded) => {
			// if the token is invalid or fails, send a 403 unauth status
			if (err) {
				return res.status(403).send(err, 'Unauthorized');
			}
			// if the token is valid, the 'decoded' parameter contains the payload of the JWT
			// attach the decoded payload (user info) to the request object
			// which allows for subsequent middleware or route handlers to also have access to the user info
			req.user = decoded;
			// call the next functioon in the middleware/route handler chain
			// this passes control to the next middleware or route handler
			next();
		});
	} else {
		// if no token is provided in the headers, send a 403 "Unauthorized" response
		// this blocks the request from proceeding further if no token is present
		res.status(403).send('Unauthorized');
	}
};

module.exports = authMiddleware;
