const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')


const expressConfig = (app) =>{
    app.use(express.static(path.resolve(__dirname, '../static')));
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());
}

module.exports = expressConfig;