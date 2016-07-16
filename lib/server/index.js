var express     = require('express');
var bodyParser  = require('body-parser');
var errHandler  = require('./utils/errHandler.js');

var app         = express();
var JobService 	= require('../db');

app.use(bodyParser.json());
app.use(errHandler);

require('./routes/get.js')(app, JobService);
require('./routes/post.js')(app, JobService);

app.listen(8080);