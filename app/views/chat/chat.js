'use strict';

angular.module('chatApp.chat', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/chat', {
    templateUrl: 'views/chat/chat.html',
    controller: 'ChatCtrl'
  });
}])

.controller('ChatCtrl', function($scope) {
  $scope.messages = ['yo', 'hello'];
});