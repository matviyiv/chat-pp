'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.controller('ChatCtrl', function($scope, chatSocket) {
  var userName = 'nickName' + new Date().getTime();
  $scope.messages = [];

  $scope.addMessage = function() {
    if (!this.newMessage || this.newMessage === '') return;

    chatSocket.emit('message', userName, this.newMessage);
    this.newMessage = '';
  };

  $scope.$on('socket:msgBroadcast', function(event, data) {
    $scope.messages.push({
      text: data.msg,
      position: data.user === userName ? 'left' : 'right'
    });
  });
});