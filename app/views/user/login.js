'use strict';

angular.module('chatApp.login', ['ngRoute', 'ngMessages'])
  .controller('LoginController', function ($scope, $rootScope, $http, $location) {
    $scope.credentials = {};

    $scope.login = function () {
      $http.post('/login', {
        username: $scope.credentials.username,
        password: $scope.credentials.password
      })
        .success(function (user) {
          $rootScope.message = 'Authentication successful!';
          $location.url('/chat');
        })
        .error(function () {
          $rootScope.message = 'Authentication failed.';
          $location.url('/login');
        });
    };
  });