const Issue = require('../models/issue');
const Project = require('../models/project'); // Import the Project model
module.exports.issues = async function (req, res) {
    try {
        // Retrieve issues data from the database
        const issues = await Issue.find({}); // This retrieves all issues; you can add query conditions if needed

        // Send the issues data as JSON in the response
        res.json(issues);
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving issues data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};