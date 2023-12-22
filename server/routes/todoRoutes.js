// route handling for all routs dealing directly with the todos

// require express
const express = require('express');
const { Pool } = require('pg');

// initialize an express router
const router = express.Router();

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'todos',
	password: process.env.DB_SECRET,
	port: 5432
});

// create local storage array for the todos
let todos = [{ id: 0, task: 'Wash dishes' }];

// create a get handler to the path /todos that sends back the todos
router.get('/', async (req, res) => {
		const { rows } = await pool.query('SELECT * FROM todos')
	// send back todos in json format
	res.json(rows);
	console.log(`GET /todos`);
});

// create a post handler that is used for adding a new todo to the array
router.post('/', (req, res) => {
	// create new todo object from the req and store in variable newTodo
	// be sure to add and id
	const newTodo = { id: Date.now(), ...req.body };
	// add newTodo to the todos array
	todos.push(newTodo);
	console.log(`POST /todos`);
	// send back a 201 status code along with newTodo in json format
	res.status(201).json(newTodo);
});

router.get('/test', (req, res) => {
  res.send('This is a test');
});

// export the router to be used in the main file
 module.exports = router;