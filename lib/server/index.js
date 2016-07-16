var express     = require('express');
var bodyParser  = require('body-parser');
var errHandler  = require('./utils/errHandler.js');

var app         = express();
var JobService 	= require('../db');

var PORT 		= process.env.PORT || 8080;
var package 	= require('../../package.json');

app.use(bodyParser.json());
app.use(errHandler);

require('./routes/get.js')(app, JobService);
require('./routes/post.js')(app, JobService);

module.exports = app;