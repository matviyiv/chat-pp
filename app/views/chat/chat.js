'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'views/chat/chat.html',
    controller: 'ChatCtrl'
  });
}])

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