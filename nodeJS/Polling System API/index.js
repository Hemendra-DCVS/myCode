const express = require('express');
const port =  8000;
const app = express();

// Import database configuration
const db = require('./api/config/mongoose.js');
const bodyParser = require('body-parser');
// Import models
const question = require('./api/models/question');
const options = require('./api/models/options');

// app.use(express.json()); //this is important otherwise we cannot create data
// Parse incoming URL-encoded form data and populate the request body
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Import and use routes from the 'routes' module
app.use('/', require('./api/routes/routes-index'));


// Start the server and listen on the defined port
app.listen(port, function(err) {
  if (err) {
    console.log('Error:', err);
  }
  console.log('Server is running on port:', port);
});
