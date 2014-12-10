'use strict';

angular.module('chatApp', [
  'ngRoute',
  'btford.socket-io',
  'chatApp.chat'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/chat'});
}])
.factory('chatSocket', function (socketFactory) {
  var socket = socketFactory();
  socket.forward('msgBroadcast');
  return socket;
});
