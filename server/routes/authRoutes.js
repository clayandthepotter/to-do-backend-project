// requirements 
const express = require('express');
const jwt = require('jsonwebtoken');

// load and store our JWT secret key
const secretKey = process.env.JWT_SECRET;

// initialize express router
const router = express.Router();


// create local storage array of users
let users = [
	{ id: 1, username: 'claytron', password: '123456' },
	{ id: 2, username: 'dingus', password: '321654' },
];

// base route: /login

// create post handler to handle authentication
router.post('/', (req, res) => {
	// extract username and password from request body
	const { username, password } = req.body; //assumes req.body will contain username and password
	// find user in users array whose credentials match what is sent in the request
	const user = users.find(
		(u) => u.username === username && u.password === password
	);
	// if user is found, create a JWT token
	if (user) {
		// jwt.sign creates a new JWT with the specified payload and secret key
		const token = jwt.sign(
			{ userId: user.id }, // payload: conatains user info, eg. user id
			secretKey, // the secret key used for signing the token
			{ expiresIn: '1h' } // sets the token expiration time to 1 hr
		);

		// seend the created token back in the response
		res.json({ token });
	} else {
		// no user found, send back 401 unauth response
		res.status(401).send('Authentication Failed');
	}
});

// mock get req for login page
router.get('/', (req, res) => {
	res.send('Login page');
});


// export the router to be used in the main file
 module.exports = router;