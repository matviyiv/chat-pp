'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'views/chat/chat.html',
    controller: 'ChatCtrl'
  });
}])

.controller('ChatCtrl', function($scope, chatSocket) {
  $scope.messages = [];

  $scope.addMessage = function() {
    if (!this.newMessage || this.newMessage == '') return;

    chatSocket.emit('message', 'nickName', this.newMessage);
    this.newMessage = '';
  }

  $scope.$on('socket:msgBroadcast', function(event, data) {
    console.log('socket msg', data);
    $scope.messages.push(data.msg);
  });
});