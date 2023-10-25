const express = require('express');
const router = express.Router();


 // Import the controller for handling routes
 const optionsController = require('../../controllers/v1/options-controller'); //  relative path 


//  router.post('/create',  optionsController.create ); //from question-routes.js
//  router.post('/:optionid/vote', optionsController.vote);
 router.delete('/:optionid', optionsController.deleteOption);

module.exports = router; // Export the router for use in other parts of the application
