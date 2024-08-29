const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.DB;

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to the database.');
});

db.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected from the database.');
});

module.exports = db;
