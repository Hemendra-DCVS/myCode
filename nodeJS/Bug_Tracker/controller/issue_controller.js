const Issue = require('../models/issue');
const Project = require('../models/project'); // Import the Project model

module.exports.createIssue = async function (req, res) {
    try {
      const projectId = req.params.projectId;
      // Fetch the project details based on the projectId
      const project = await Project.findById(projectId); // Use Project model here
      const issues = await Issue.find({ project: projectId });
      
      return res.render('issue', { project, issues });
    } catch (error) {
      console.error('Error fetching project:', error);
      // Handle errors, e.g., display an error message or redirect to an error page
      res.status(500).send('An error occurred while fetching the project.');
    }
};

module.exports.newIssue = async function (req, res) {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);
    const labelsArray = req.body.labels || []; // Ensure labelsArray is an array
    
    const newIssue = new Issue({
      project: projectId,
      issueTitle: req.body.issueTitle,
      description: req.body.description,
      Author: req.body.Author,
      labels: labelsArray,
    });
    
    await newIssue.save();
    
    const issues = await Issue.find({ project: projectId });
    
    return res.render('issue', { project, issues });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).send('An error occurred while creating the issue.');
  }
};
