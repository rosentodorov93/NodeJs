const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const {SECRET} = require('../constants');

async function validatePassword(password, userPassword) {
    const isValid = await bcrypt.compare(password, userPassword);

    if(!isValid){
        throw new Error("Invalid email or password");
    }
}

async function generetaToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
    }
    const token = await jwt.sign(payload, SECRET, {expiresIn: "2d"});
    return token;
}

exports.register = async (userdata) =>{
    const user = await User.create(userdata);
    const {password} = userdata;

    await validatePassword(password, user.password);
    const token = await generetaToken(user);

    return token;
}
exports.login = async (email, password) =>{

    const user = await User.findOne({email});

    if(!user){
        throw new Error("Invalid email or password");
    }

    await validatePassword(password, user.password);
    const token = await generetaToken(user);

    return token;
}
