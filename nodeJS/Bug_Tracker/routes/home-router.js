const express = require('express');
const router = express.Router();
console.log('router loaded'); // Log a message to indicate that the router is loaded

const homecontroller = require('../controller/home_controller'); // Import the controller for handling routes

// Handle GET request to the root URL ('/')
router.get('/', homecontroller.home);

router.use('/projects', require('./project'));
router.use('/issues',  require('./issue'));
router.use('/api', require('./api'));
module.exports = router; // Export the router for use in other parts of the application
