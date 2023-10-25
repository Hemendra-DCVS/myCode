const question = require('../../models/question');// Import the model
const option = require('../../models/options'); // Import the model


module.exports.create = async function (req, res) {
    try {
      const questionId = req.params.questionId;
      const { text } = req.body;
      console.log({ text }, req.params)
      // Create a new option and link it to the specified question
      const newOption = await option.create({ text, question: questionId });
      newOption.save();
      return res.status(201).json({
         message: 'Option created successfully',
          option: newOption 
        });
    } catch (error) {
      console.error('Error creating option:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.vote = async function (req, res) {
    try {
      // Extract the option ID from the URL parameters
      const optionId = req.params.optionid;
  
      // Use Mongoose's $inc operator to increment the 'votes' field by 1
      const updatedOption = await option.findByIdAndUpdate(optionId, { $inc: { votes: 1 } }, { new: true });
  
      if (!updatedOption) {
        return res.status(404).json({ error: 'Option not found' });
      }
  
      return res.status(200).json({
        message: 'Vote added successfully',
         option: updatedOption 
        });

    } catch (error) {
      console.error('Error adding vote:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports.deleteOption = async function (req, res) {
    try {
        const optionId = req.params.optionid;

        // Find the option by ID
        const opt = await option.findById(optionId);

        if (!opt) {
            return res.status(404).json({ error: 'Option not found' });
        }

        // Check if votes are 0, if not, prevent deletion
        if (opt.votes > 0) {
            return res.status(400).json({ error: 'Cannot delete; votes exist' });
        }

        // If votes are 0, delete the option
        await option.findByIdAndDelete(optionId);

        return res.status(200).json({ 
            message: 'Option deleted successfully'
         });
         
    } catch (error) {
        console.error('Error deleting option:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};