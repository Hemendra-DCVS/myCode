// Import the Mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to import Schema
const option = require('./options');
// Define a new Mongoose schema for tasks
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'options', // Reference to the "Option" model
  }],
}, { timestamps: true });



// Create a Mongoose model for  the defined schema
const question = mongoose.model('Question', questionSchema);

// Export the model to be used in other parts of the application
module.exports = question;
