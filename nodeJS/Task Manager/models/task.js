// Import the Mongoose library
const mongoose = require('mongoose');

// Define a new Mongoose schema for tasks
const taskSchema = new mongoose.Schema({
    // Define a field for task description, which is a required string
    task: {
        type: String,
        required: true
    },
    // Define a field for task date, which is a string (optional)
    date: {
        type: String,
    },
    // Define a field for task category, which is a string (optional)
    category: {
        type: String,
    }
});

// Create a Mongoose model for tasks using the defined schema
const Task = mongoose.model('Task', taskSchema);

// Export the Task model to be used in other parts of the application
module.exports = Task;
