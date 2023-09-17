// Import the Express.js library to create the application
const express = require('express');

// Define the port number on which the server will run
const port = 8000;

// Create an instance of the Express application
const app = express();

// Import the database configuration
const db = require('./config/mongoose');

// Import the Task model
const task = require('./models/task');

// Serve static files (like CSS, JavaScript, etc.) from the 'assets' directory
app.use(express.static('./assets'));

// Parse incoming URL-encoded form data and populate the request body
app.use(express.urlencoded({ extended: true }));

// Import and use the routes defined in the 'routes' module
app.use('/', require('./router/routes'));

// Set the view engine to use EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Set the 'views' directory to look for EJS templates
app.set('views', './views');

// Start the server and listen on the defined port
app.listen(port, function(err){
    if(err){
        // If there's an error, log the error message
        console.log('Error:', err)
    }
    // If the server starts successfully, log a message with the port number
    console.log('Server is running on port:', port);
})
