'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'views/chat/chat.html',
    controller: 'ChatCtrl'
  });
}])

.controller('ChatCtrl', function($scope) {
  $scope.messages = [];
  $scope.noHistory = 'This conversation has no history yet!';

  $scope.addMessage = function() {
    if (!this.newMessage || this.newMessage == '') return;

    $scope.noHistory = '';
    $scope.messages.push(this.newMessage);
    this.newMessage = '';
  }
});