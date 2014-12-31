'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.controller('ChatCtrl', function($scope, chatSocket) {
  var userName = 'nickName' + new Date().getTime();
  $scope.messages = [];

  $scope.addMessage = function() {
    var timestamp = '',
        today = new Date();

    if ($scope.chatForm.$invalid) return false;

    timestamp = today.getHours() + ':' + (today.getMinutes() > 10 ? today.getMinutes() : '0' + today.getMinutes());

    chatSocket.emit('message', userName, this.newMessage, timestamp);
    this.newMessage = '';
  };

  $scope.$on('socket:msgBroadcast', function(event, data) {
    $scope.messages.push({
      text: data.msg,
      position: data.user === userName ? 'left' : 'right',
      time: data.timestamp
    });
  });
});