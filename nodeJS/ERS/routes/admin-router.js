//admin-dashboard controls
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee'); // Import your Employee model
const PerformanceReview = require('../models/PerformanceReview');

// Add an Employee (Create)
router.post('/add-employee', async (req, res) => {
    const { username, password, isAdmin } = req.body;

    try {
        // Check if an employee with the same username already exists
        const existingEmployee = await Employee.findOne({ username });

        if (existingEmployee) {
            return res.status(400).send('Username already exists');
        }

        // Create a new employee using the form data
        const newEmployee = new Employee({
            username,
            password,
            isAdmin: isAdmin === 'on', // Convert checkbox value to a boolean
        });

        await newEmployee.save();
        const employees = await Employee.find();
        const performanceReviews = await PerformanceReview.find().populate('assignedTo');
        
        // Create an empty performanceReview object to be used in the 'assign-employees-form'
        const emptyPerformanceReview = {};
        
        // Render the admin dashboard view
        res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview }); // Redirect back to the admin dashboard
    } catch (error) {
        // Handle errors
        res.status(500).send('An error occurred while adding the employee.');
    }
});




// Remove an Employee (Delete)
router.get('/remove-employee/:id', async (req, res) => {
  // Find and remove an employee by ID
  try {
      await Employee.findByIdAndRemove(req.params.id);
      const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find().populate('assignedTo');
      
      // Create an empty performanceReview object to be used in the 'assign-employees-form'
      const emptyPerformanceReview = {};
      
      // Render the admin dashboard view
      res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
  } catch (error) {
      // Handle errors by redirecting back
      res.redirect('back');
  }
});


// Update an Employee (Update) - render the form within the admin dashboard
router.get('/update-employee/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);
    const employees = await Employee.find(); // Fetch all employees for rendering the dashboard

   
    const performanceReviews = await PerformanceReview.find().populate('assignedTo');
    // Create an empty performanceReview object to be used in the 'assign-employees-form'
    const emptyPerformanceReview = {};
    
    // Render the admin dashboard view
   
    res.render('admin-dashboard', { employees,performanceReviews, performanceReview: emptyPerformanceReview, updateEmployee: employee,  });
});


// Update an Employee (Update)
router.post('/update-employee/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).send('Employee not found');
      }
  
      // Update employee properties, including the isAdmin property
      employee.username = req.body.username;
      employee.password = req.body.password;
      employee.isAdmin = req.body.isAdmin === 'on'; // Convert checkbox value to a boolean
  
      // Save the updated employee
      await employee.save();
      const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find();
      
      // Render the admin dashboard view and set updateEmployee to undefined
      res.render('admin-dashboard', { employees, performanceReviews });

    } catch (error) {
      // Handle errors by redirecting back
      res.redirect('back');
    }
  });
  

// View Employees
router.get('/view-employees', async (req, res) => {
  // Retrieve and render the list of employees
  try {
      const employees = await Employee.find();
      res.render('admin-dashboard', { employees });
  } catch (error) {
      // Handle errors by redirecting back
      res.redirect('back');
  }
});

// Make Employee an Admin
router.get('/make-admin/:id', async (req, res) => {
  // Find and make an employee an admin
  try {
      const employee = await Employee.findById(req.params.id);
      employee.isAdmin = true;
      await employee.save();
      const employees = await Employee.find();
      const performanceReviews = await PerformanceReview.find().populate('assignedTo');
      
      // Create an empty performanceReview object to be used in the 'assign-employees-form'
      const emptyPerformanceReview = {};
      
      // Render the admin dashboard view
      res.render('admin-dashboard', { employees, performanceReviews, performanceReview: emptyPerformanceReview });
  } catch (error) {
      // Handle errors by redirecting back
      res.redirect('back');
  }
});

module.exports = router;
