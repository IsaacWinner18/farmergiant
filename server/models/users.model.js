const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
  
    verified: {
        type: Boolean,
        default: false,
    },
});

// // Hash the password before saving
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     this.confirmPassword = undefined; // Do not save confirmPassword in the database
//     next();
// });


const User = mongoose.model('User', userSchema);

module.exports = User;