"use strict";
var express = require('express');
//  path = require('path'),
var bodyParser = require('body-parser');
var cors = require('cors');
// mongoose = require('mongoose');
// const mysql = require('mysql2');
var app = express();
var server = require('http').Server(app);
var port = process.env.PORT || 3000;
// Use Middlewares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'test'
// });
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
//   }
//   app.use(cors(corsOptions))
app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});
// Set Static Path
app.use('/', express.static(__dirname));
// Import all user routes
app.use(require('./api/test'));
//log all uncaught exceptions with additional information, then exit.
app.use(function (err, req, res, next) {
    console.log('oh god', err);
    process.exit(1);
});
server.listen(process.env.PORT || 3000, function () {
    console.log("Server connected. Listening on port: " + (process.env.PORT || 3000));
});
//# sourceMappingURL=index.js.map