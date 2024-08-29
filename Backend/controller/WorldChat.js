const World = require('../Models/WorldChat');
const asyncHandler = require('express-async-handler');

const WorldChatHandler = asyncHandler(async (req, res) => {
  const { name, text } = req.body;
  if (!name || !text) {
    console.log('Data required in World Chat');
    return res.status(400).json({ message: 'Name and text are required.' });
  }

  try {
    const newChat = new World({ name, text });
    const saveChat = await newChat.save();
    if (saveChat) {
      return res.status(200).json({ name, text });
    } else {
      return res.status(500).json({ message: 'Failed to save chat message.' });
    }
  } catch (error) {
    console.error('Error saving chat message:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});


const WorldChatGetHandler = asyncHandler(async (req, res) => {
    try {
      const data = await World.find();
      res.status(200).json({ data });
    } catch (error) {
      console.error('Error fetching chat data:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  

module.exports = {
  WorldChatHandler,
  WorldChatGetHandler
};
