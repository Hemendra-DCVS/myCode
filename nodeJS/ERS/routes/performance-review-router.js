//these routes are part-II of the admin dashboard page related routes

const express = require('express');
const router = express.Router();
const PerformanceReview = require('../models/PerformanceReview');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');
// Add Performance Review Form
router.post('/add-performance-review', async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const performanceReview = new PerformanceReview({ title, description, assignedTo });
    
    await performanceReview.save();
    const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find().populate('assignedTo');
      
      // Create an empty performanceReview object to be used in the 'assign-employees-form'
      const emptyPerformanceReview = {};
      
      // Render the admin dashboard view
      res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
  } catch (error) {
    // Handle errors
    res.redirect('back');
  }
});

// Update Performance Review Form
router.get('/update-performance-review/:id', async (req, res) => {
  const performanceReview = await PerformanceReview.findById(req.params.id);
  if (!performanceReview) {
    return res.redirect('back');
  }
  const employees = await Employee.find();
  res.render('Update-PR', { review: performanceReview, employees });
});

router.post('/update-performance-review/:id', async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const performanceReview = await PerformanceReview.findById(req.params.id);
    if (!performanceReview) {
      return res.redirect('back');
    }
    performanceReview.title = title;
    performanceReview.description = description;
    performanceReview.assignedTo = assignedTo;
    await performanceReview.save();
    const employees = await Employee.find();
    const performanceReviews = await PerformanceReview.find().populate('assignedTo');
    
    // Create an empty performanceReview object to be used in the 'assign-employees-form'
    const emptyPerformanceReview = {};
    
    // Render the admin dashboard view
    res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
  } catch (error) {
    // Handle errors
    res.redirect('back');
  }
});
// Assign Employees to Participate in a Performance Review Form
router.get('/assign-employees/:id', async (req, res) => {
  try {
    // Log the id from the URL to verify if it's correct
    const id = req.params.id;
    console.log('Performance Review ID:', id);

    const employees = await Employee.find();
    const performanceReviews = await PerformanceReview.find().populate('assignedTo');
    const performanceReview = await PerformanceReview.findById(id);
    if (!performanceReview) {
      return res.redirect('back');
    }
    res.render('Assign-Employees', { employees,performanceReviews, performanceReview });
  } catch (error) {
    // Handle errors
    res.redirect('back');
  }
});
router.post('/assign-employees/:id', async (req, res) => {
  try {
    console.log('Received request with data:', req.body);
    // Convert assignedEmployees to an array of ObjectIds
    const { assignedEmployees } = req.body;
    const assignedEmployeeIds = assignedEmployees.map(employeeId => new mongoose.Types.ObjectId(employeeId));



    const performanceReview = await PerformanceReview.findById(req.params.id);
    if (!performanceReview) {
      console.log('Performance review not found');
      return res.redirect('back');
    }
    performanceReview.assignedTo = assignedEmployeeIds; // Assign the array of ObjectIds
    await performanceReview.save();
    const employees = await Employee.find();
    const performanceReviews = await PerformanceReview.find().populate('assignedTo');
    
    // Create an empty performanceReview object to be used in the 'assign-employees-form'
    const emptyPerformanceReview = {};
    
    // Render the admin dashboard view
    res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
  } catch (error) {
    console.log(error);
    res.redirect('back');
  }
});



module.exports = router;
