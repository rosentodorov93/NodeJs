const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'First name must be atleats 3 characters long'],
    },

    email: {
        type: String,
        required: [true, 'Email is required!'],
        isEmail: [true, "Please enter valid email"],
        minLength: [10, 'Email must be atleats 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be atleats 4 characters long'],
    }
})

userSchema.virtual('repeatPassword').set(function(value){
    if(!value){
        this.invalidate('repeat password', "Repeat password is required")
    }

    if(value !== this.password){
        this.invalidate('repeat password', "Passwords do not match!")
    }
})

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model("User", userSchema);

module.exports = User;

