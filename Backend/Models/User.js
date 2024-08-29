const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    pass: { type: String, required: true },
    pic: { type: String}
}, {
    timestamps: true,
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('pass')) return next();
    const salt = await bcrypt.genSalt(10);
    this.pass = await bcrypt.hash(this.pass, salt);
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
