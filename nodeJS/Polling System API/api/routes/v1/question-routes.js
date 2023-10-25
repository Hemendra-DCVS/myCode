const express = require('express');
const router = express.Router();

 // Import the controller for handling routes
const questionController = require('../../controllers/v1/question-controller'); //  relative path 
const optionsController = require('../../controllers/v1/options-controller');
// router.use('/:questionId/options', require('./options-routes')); //create options under questionID
router.post('/:questionId/options/create',  optionsController.create );
router.post('/create', questionController.create);
router.post('/:questionId/options/:optionid/vote', optionsController.vote);
router.delete('/:questionid', questionController.deleteQuestion);

module.exports = router; // Export the router for use in other parts of the application
