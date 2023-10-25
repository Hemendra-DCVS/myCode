const express = require('express');
const router = express.Router();




router.use('/question',  require('./question-routes'));
router.use('/options', require('./options-routes'));
module.exports = router; // Export the router for use in other parts of the application
