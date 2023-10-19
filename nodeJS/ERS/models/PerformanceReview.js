const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
  ],
 
});


const  PerformanceReview = mongoose.model('PerformanceReview', performanceReviewSchema);
 module.exports =  PerformanceReview;