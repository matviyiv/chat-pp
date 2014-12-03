'use strict';

angular.module('chatApp', [
  'ngRoute',
  'chatApp.chat'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/chat'});
}]);
