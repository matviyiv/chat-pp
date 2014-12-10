exports.handlers = function(io) {
  'use strict';
  io.on('connection', function (socket) {
    socket.on('message', function(from, msg) {
      console.log('recieved message from', from, 'msg', JSON.stringify(msg));
      io.sockets.emit('msgBroadcast', {
        msg: msg, user: from
      });
    });
  });
}