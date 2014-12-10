#!/usr/bin/env node
var app = require('./../app'),
    io = require('socket.io'),
    socketRouter = require('./../routes/sockets'),
    server;

app.set('hostname', process.env.HOSTNAME || 'localhost');
app.set('port', process.env.PORT || 8000);

server = app.listen(app.get('port'), app.get('hostname'), function () {
    console.log('Express server listening on port ' + server.address().address + ':' + server.address().port);
});

io = require('socket.io').listen(server);
socketRouter.handlers(io);
