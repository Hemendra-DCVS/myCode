// Import the necessary modules and controllers
const express = require('express');
const router = express.Router();
console.log('router loaded'); // Log a message to indicate that the router is loaded

const homecontroller = require('../controller/task_controller'); // Import the controller for handling routes

// Handle GET request to the root URL ('/')
router.get('/', homecontroller.home);

// Handle POST request to '/add-task' URL
router.post('/add-task', homecontroller.add);

// Handle POST request to '/delete-task/:id' URL
router.post('/delete-task/:id', homecontroller.delete);

module.exports = router; // Export the router for use in other parts of the application
