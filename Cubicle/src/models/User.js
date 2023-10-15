const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: [true, 'Username is required'],
        minLength: [3, "Username must be atleast 3 characters long"],
    },
    password: {
        type: String,
        reqired: [true, 'Password is required'],
        minLength: [3, "Password must be atleast 3 characters long"],
        maxLength: [8, "Password must can not be more than 8 character long"],
    }
})

userSchema.path('username').validate(function(username){
    const user = mongoose.model("User").findOne({username});
    return !!user;
})
userSchema.virtual("repeatPassword").set(function(value){
    if(value !== this.password){
        this.invalidate('password', 'Passwords do not match!')
    }
})
userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model("User", userSchema);

module.exports = User;