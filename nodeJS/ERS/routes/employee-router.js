const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Employee = require('../models/Employee');
const PerformanceReview = require('../models/PerformanceReview');



// Handle feedback submission
router.post('/submit-feedback', async (req, res) => {
    try {
       
        const { reviewId, feedbackText } = req.body;
        const employeeId = req.session.passport.user;

        const feedback = new Feedback({
            reviewer: employeeId,
            performanceReview: reviewId,
            feedbackText,
        });

        await feedback.save();

        // Update the performance review to mark feedback as submitted
        await PerformanceReview.findByIdAndUpdate(reviewId, { $pull: { assignedTo: employeeId } });

        res.redirect('/dashboard'); // Redirect to the employee dashboard or any other suitable page
    } catch (error) {
        // Handle errors
        console.log(error);
        res.redirect('back');
    }
});

module.exports = router;
