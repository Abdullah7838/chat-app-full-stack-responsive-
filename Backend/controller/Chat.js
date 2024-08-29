const Chat = require('../Models/Chat');
const User = require('../Models/User');
const asyncHandler = require('express-async-handler');

const messageSendHandler = asyncHandler(async (req, res) => {
    const { receiver, text } = req.body;

    if (!receiver || !text) {
        console.log('Receiver and text are required');
        return res.status(400).json({ msg: "Receiver and text are required" });
    }

    try {
        const receiverUser = await User.findById(receiver);

        if (!receiverUser) {
            console.log('Receiver not found');
            return res.status(404).json({ msg: "Receiver not found" });
        }

        // Create a new chat message
        const newChat = new Chat({ receiver, text });

        // Save the message to the database
        const savedChat = await newChat.save();

        if (savedChat) {
            console.log('Message sent successfully');
            return res.status(201).json({ msg: "Message sent", chat: savedChat });
        }

        console.log('Message not saved');
        return res.status(500).json({ msg: "Message not saved" });
    } catch (error) {
        console.error('Server error:', error);
        return res.status(500).json({ msg: "Server error" });
    }
});

module.exports = {
    messageSendHandler
};
