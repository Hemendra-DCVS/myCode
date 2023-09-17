// Import the Task model for working with tasks
const Task = require("../models/task");

// Controller function to handle the GET request for the home page
module.exports.home = function(req, res){
    // Find all tasks in the database
    Task.find({})
    .then((tasks) => {
      // Render the 'home' view and pass tasks to it
      return res.render('home', {
        title: "Task Manager",
        tasks_list : tasks,
      });
    })
    .catch((err) => {
      console.error(err);
      // Handle errors by sending a 500 Internal Server Error response
      return res.status(500).send('An error occurred while fetching the tasks.');
    });
};

// Controller function to handle the POST request for adding a new task
module.exports.add = function(req, res) {
  // Extract task, date, and category from the request body
  const { task, date, category } = req.body;

  // Create a new task document in the database
  Task.create({
    task: task,
    date: date,
    category: category
  })
    .then((result) => {
      console.log("Task created");
      // Redirect the user back to the previous page
      return res.redirect('back');
    })
    .catch((err) => {
      console.log("Error creating task", err);
      // Handle errors by redirecting the user back with an error message
      return res.redirect('back');
    });
}

// Controller function to handle the POST request for deleting a task by ID
module.exports.delete =  function(req, res) {
  // Extract the task ID from the URL parameters
  let id = req.params.id;

  // Find and delete the task document by ID
  Task.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        // Handle the case where the task is not found with a 404 response
        return res.status(404).send('ERROR: Task not found.');
      } else {
        console.log("Task deleted");
      }
      // Redirect the user back to the previous page
      return res.redirect('back');
    })
    .catch((err) => {
      console.error(err);
      // Handle errors by sending a 500 Internal Server Error response
      return res.status(500).send('An error occurred while deleting the task.');
    });
};
