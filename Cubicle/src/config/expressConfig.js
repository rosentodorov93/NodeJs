const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {authUser} = require('../middlewares/authMiddleware');


const expressConfig = (app) =>{
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(authUser);
}

module.exports = expressConfig;