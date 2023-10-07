const bcrypt = require('bcrypt');
const User = require('../models/User');


exports.register = async(username, password) =>{
    const salt = await bcrypt.genSalt(10);
    const passwordHesh = await bcrypt.hash(password, salt);

    const result = await User.create({username,password:passwordHesh});
    return result;
}