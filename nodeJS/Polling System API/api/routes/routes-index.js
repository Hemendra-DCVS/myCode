const express = require('express');
const router = express.Router();
console.log('router loaded'); // Log a message to indicate that the router is loaded

const questioncontroller = require('../controllers/v1/question-controller'); // Import the controller for handling routes

// Handle GET request to the root URL ('/')
router.get('/', questioncontroller.questions);
router.use('/v1', require('./v1/v1-index'));
module.exports = router; // Export the router for use in other parts of the application