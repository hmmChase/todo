var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');

// import router from './routes/routes.js';
var router = require('./routes/routes.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

module.exports = app;
