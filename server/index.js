// require express, cors, and JWT
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// require and config dotenv
require('dotenv').config()

// load and store our JWT secret key
const secretKey = process.env.JWT_SECRET

// create express app
const app = express();

// middleware: intermediate function that we want to run
// in between the request and the response

// enable cors
app.use(cors());

// middleware to log request
app.use((req, res, next) => {
  // req.method: get, post, put, delete...  req.url: /api/users
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

// set up JSON parsing
app.use(express.json());

// create local storage array for the todos
let todos =[
  {id: 0, task: 'Wash dishes'},
];

// create local storage array of users
let users = [
  {id: 1, username: 'claytron', password: "123456"},
  {id: 2, username: 'dingus', password: "321654"}
]

// HTTP handlers related to login ------------------------------------------------------------------------------
// mock get req for login page
app.get('/login', (req, res) => {
  res.send('Login page')
})

// create post handler to handle authentication
app.post('/login', (req, res) => {
  // extract username and password from request body
  const { username, password } = req.body; //assumes req.body will contain username and password
  // find user in users array whose credentials match what is sent in the request
  const user = users.find(u => u.username === username && u.password === password);
  // if user is found, create a JWT token
  if (user) {
    // jwt.sign creates a new JWT with the specified payload and secret key
    const token = jwt.sign(
      {userId: user.id}, // payload: conatains user info, eg. user id 
      secretKey, // the secret key used for signing the token
      {expiresIn: '1h'} // sets the token expiration time to 1 hr
      );

    // seend the created token back in the response
    res.json({token});
  } else {
    // no user found, send back 401 unauth response
    res.status(401).send('Authentication Failed')
  }
})

// HTTP Handles related to todo data ---------------------------------------------------------------------------

// create a get handler to the path /todos that sends back the todos
app.get('/todos', (req, res) => {
  // send back todos in json format
  res.json(todos);
  console.log(`GET /todos`)
})

// create a post handle to the path /todos that is used for adding a new todo to the array
app.post('/todos', (req, res) => {
  // create new todo object from the req and store in variable newTodo
  // be sure to add and id
  const newTodo = {id: Date.now(), ...req.body, };
  // add newTodo to the todos array
  todos.push(newTodo);
  console.log(`POST /todos`)
  // send back a 201 status code along with newTodo in json format
  res.status(201).json(newTodo)
})


// define port
const PORT = 3001

// listen to PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})