const User = require('../Models/User');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

const SignupHandler = asyncHandler(async (req, res) => {
    const { username, email, pass, pic } = req.body;
    if (!username || !email || !pass) {
        console.log('All Fields are required for Signup');
        return res.status(400).json({ msg: "All Fields are required for Signup" });
    }
    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            console.log('User with provided email or username already exists');
            return res.status(409).json({ msg: "User with provided email or username already exists" });
        }
        const newUser = await User.create({ username, email, pass, pic });
        const token = generateToken(newUser._id);
        console.log('Signup Successfully');
        res.status(201).json({
            msg: "Signup Successful",
            user: newUser,
            token
        });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ msg: "Server Error", error: error.message });
    }
});

const LoginHandler = asyncHandler(async (req, res) => {
    const { email, pass } = req.body;
    if (!email || !pass) {
        console.log('All Fields are required for Login');
        return res.status(400).json({ msg: "All Fields are required for Login" });
    }
    const user = await User.findOne({
        $or: [
            { email: email }, 
            { username: email }
        ]
    });
    if (!user) {
        console.log('Invalid email or password');
        return res.status(401).json({ msg: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(pass, user.pass);
    if (!isMatch) {
        console.log('Invalid email or password');
        return res.status(401).json({ msg: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    console.log('Login Successfully');
    res.status(200).json({
        msg: "Login Successful",
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            pic: user.pic
        },
        token
    });
});

module.exports = { SignupHandler ,LoginHandler };
