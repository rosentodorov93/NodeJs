const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('../constants');

async function dbConnection(){
    mongoose.set('runValidators', true);
    await mongoose.connect(CONNECTION_STRING);
}

module.exports = dbConnection;