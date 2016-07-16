var firebase    = require('firebase');
var config      = require('../../config.json');

firebase.initializeApp(config);

var rootRef     = firebase.database().ref('jobs');
module.exports  = require('./plugins')(rootRef);