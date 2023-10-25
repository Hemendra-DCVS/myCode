// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database with the specified URL
mongoose.connect('mongodb://localhost/Polls_db');

// Get a reference to the database connection
const db = mongoose.connection;

// Event handler for database connection errors
db.on('error', console.error.bind(console, 'error connecting to the database'));

// Event handler for a successful database connection
db.once('open', function(){
    // Log a message indicating a successful database connection
    console.log('database connected')
})
