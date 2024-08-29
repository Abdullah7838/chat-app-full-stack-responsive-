const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    name: {
        type: String,  
        ref: 'User', 
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const WorldChat = mongoose.model('WorldChat', messageSchema);

module.exports = WorldChat;
