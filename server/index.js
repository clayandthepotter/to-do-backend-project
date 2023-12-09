// require and config dotenv
require('dotenv').config();

// require express and cors
const express = require('express');
const cors = require('cors');

// require middleware
const authMiddleware = require('./middleware/authMiddleware');
const reqLogMiddleware = require('./middleware/reqLogMiddleware');

// require routes
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// create express app
const app = express();

// enable cors
app.use(cors());

// set up JSON parsing
app.use(express.json());

// enable reqLogMiddleware
app.use(reqLogMiddleware);

// protect /todos route with authMiddleware by applying it to the todos route
// request passes through auth middleware,
// if auth succeeds, auth middleware allows req to continue to the appropriate handler
// if auth fails, auth middleware sends res with error message
// and the req/res chain stops there
app.use('/todos', authMiddleware, todoRoutes); // now routes are in separate file

app.use('/login', authRoutes);

// define port
const PORT = 3001;

// listen to PORT
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}`);
});


