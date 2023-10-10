// Import the Mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to import Schema
const issue = require('./issue');

// Define a new Mongoose schema for projects
const projectSchema = new mongoose.Schema({
  // Define a field for project title, which is a required string
  projectTitle: {
    type: String,
    required: true
  },
  
  // Define a field for project description, which is a string (optional)
  description: {
    type: String,
    required: true
  },
  
  // Define a field for project author, which is a required string
  Author: {
    type: String,
    required: true
  },
  
  // Define a field for issues associated with the project
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'issue'
    }
  ]
}, { timestamps: true });

// Create a Mongoose model for projects using the defined schema
const project = mongoose.model('project', projectSchema);

// Export the Project model to be used in other parts of the application
module.exports = project;
