const Project = require('../models/project'); // Import the Project model

module.exports.createProject = async (req, res) => {
  try {
    const { projectTitle, description, Author } = req.body;

    // Create a new project document
    await Project.create({
      projectTitle,
      description,
      Author,
    });

  
    res.redirect('back');

  } catch (error) {
    console.error(error);
    // Handle errors, e.g., display an error message or redirect to an error page
    res.status(500).send('An error occurred while creating the project.');
  }
};
