var settings = require('../settings');
var mysql = require('mysql');
exports.db = mysql.createConnection(settings);