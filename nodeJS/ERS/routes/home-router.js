// routes/home-router.js
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const PerformanceReview = require('../models/PerformanceReview');
const Employee = require('../models/Employee');
const Feedback = require('../models/Feedback');


// Define your homepage route
router.get('/', (req, res) => {
  // Render your homepage view (e.g., home.ejs)
  res.render('home');
});



// Route requests starting with /employee to the employee router
router.use('/admin', require('./admin-router'));

// Route requests starting with /performance-review to the performance review router
router.use('/performance-review', require('./performance-review-router'));

// Route requests starting with /feedback to the feedback router
router.use('/feedback', require('./employee-router'));

// Redirect requests to the 'auth-router'
router.use('/auth', require('./auth-router'));

// Define a route to render the login page
router.get('/login', (req, res) => {
  // Render the login view (e.g., login.ejs)
  res.render('login', );
});
// Define a route to render the registration page
router.get('/register', (req, res) => {
  // Render the registration view (e.g., register.ejs)
  res.render('register',);
});



// Define the /dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    const userId = req.session.passport.user; // Assuming this is the MongoDB ObjectId

    if (!userId) {
      return res.status(400).send('User ID is missing.');
    }

    // Fetch user data from the database based on the ObjectId
    const user = await Employee.findById(userId);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    if (user.isAdmin) {
      // Fetch admin-specific data
      const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find().populate('assignedTo');
      
      // Create an empty performanceReview object to be used in the 'assign-employees-form'
      const emptyPerformanceReview = {};
      
      // Render the admin dashboard view
      res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
    }
     else {
     
      // Fetch employee-specific data
      const userId = req.session.passport.user; // Get the ID of the logged-in employee

      // Fetch performance reviews assigned to the logged-in employee
      const performanceReviews = await PerformanceReview.find({
        assignedTo: { $in: [userId] },
      });


      // Render the employee dashboard view
      res.render('employee-dashboard', { performanceReviews });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while rendering the dashboard.');
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle any error that might occur during logout
      console.error(err);
      return res.redirect('/login'); // Redirect to the login page or another page
    }
    res.redirect('/login'); // Redirect to the login page or any other page
  });
});





module.exports = router;
