// Import the Mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Add this line to import Schema
const Question = require('./question');
// Define a new Mongoose schema for tasks
const optionsSchema = new mongoose.Schema({
  
  // Issue title (required string)
  text: {
    type: String,
    required: true
  },
  votes:{
    type: Number,
    default: 0
  },
  // Issue description (required string)
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  
}, { timestamps: true }); // Enable timestamps for created and updated fields


// Define a pre-save hook to update the associated question's options array
// optionsSchema.pre('save', async function (next) {
//   try {
//     const question = await mongoose.model('Question').findById(this.question);
//     if (question) {
//       question.options.push(this._id);
//       await question.save();
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });
optionsSchema.pre('save', async function (next) {
  if (!this.isNew) {
    // If the document is not new, it has already been saved
    return next();
  }

  try {
    const question = await mongoose.model('Question').findById(this.question);
    if (question) {
      question.options.push(this._id);
      await question.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});



// Create a Mongoose model for issues using the defined schema
const option = mongoose.model('options', optionsSchema);

// Export the Issue model to be used in other parts of the application
module.exports = option;
