const question = require('../../models/question');// Import the model
const Option = require('../../models/options'); // Import the model



module.exports.questions = async function (req, res) {
    try {
        // Retrieve questions data from the database
        const questions = await question.find().populate('options'); // Populate the 'options' field

        // Map the results to include only the text and votes from options
        const all_questions = questions.map((q) => ({
            title: q.title,
            options: q.options.map((o) => ({
                text: o.text,
                votes: o.votes
            }))
        }));

        // Send the questions data as JSON in the response
        res.status(200).json({
            message: 'This list contains All Questions',
            data: all_questions
        });
    } catch (error) {
        // Handle any errors
        console.error('Error retrieving questions data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports.create = async (req, res) => {
    try {
      // Extract the "title" from the request body
      const { title } = req.body;
      console.log(req.body);
      // Check if the "title" is provided
      if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
      }
  
      // Create a new question with the provided title
      const newQuestion = await question.create({ title });
  
      // Send a success response with the created question
      return res.status(201).json({
        message: 'Question created successfully',
        question: newQuestion,
      });
    } catch (error) {
      // Handle any errors
      console.error('Error creating question:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


module.exports.deleteQuestion = async function (req, res) {
    try {
        const questionId = req.params.questionid;

        // Delete the associated options
        await Option.deleteMany({ question: questionId });
        // Delete the question itself
        await question.findByIdAndDelete(questionId);

        return res.status(200).json({ 
            message: 'Question and associated options deleted successfully'
         });
    } catch (error) {
        console.error('Error deleting question:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};