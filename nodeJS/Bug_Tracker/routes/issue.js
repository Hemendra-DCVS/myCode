// Import the necessary modules and controllers
const express = require('express');
const router = express.Router();

const issueController = require('../controller/issue_controller'); //  relative path 
 // Import the controller for handling routes

// Handle POST request 
router.post('/create', issueController.createIssue);



module.exports = router; // Export the router for use in other parts of the application
