// Import the Mongoose library
const mongoose = require('mongoose');

// Define a new Mongoose schema for tasks
const issueSchema = new mongoose.Schema({
  // Reference to the Project model
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  // Issue title (required string)
  issueTitle: {
    type: String,
    required: true
  },
  // Issue description (required string)
  description: {
    type: String,
    required: true
  },
  // Author of the issue (required string)
  Author: {
    type: String,
    required: true
  },
  // Labels for the issue (array of strings, trimmed)
  labels: [{
    type: String,
    trim: true
  }]
}, { timestamps: true }); // Enable timestamps for created and updated fields

// Create a Mongoose model for issues using the defined schema
const issue = mongoose.model('issue', issueSchema);

// Export the Issue model to be used in other parts of the application
module.exports = issue;
