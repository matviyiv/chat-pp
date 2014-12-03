var express = require('express'),
    path = require('path'),
    app = express(),
    folder = path.join(__dirname, '../app');

app.use('/', function(req, res, next) {
    //TODO: add security
    next();
});

app.use(express.static(folder));

module.exports = app;