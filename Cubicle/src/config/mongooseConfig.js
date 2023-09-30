const mongoose = require('mongoose');
const connectionString = 'mongodb://127.0.0.1:27017/cubicleDb'

async function connectDb(){
    await mongoose.connect()
}

module.exports = connectDb();