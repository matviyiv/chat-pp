'use strict';

angular.module('chatApp.new', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/user/new', {
      templateUrl: 'views/user/new.html',
      controller: 'NewCtrl'
    });
  }])

  .controller('NewCtrl', function ($scope, $http, $location) {
    $scope.saveData = function () {
      var isError = false;
      $scope.nameRequired = '';
      $scope.emailRequired = '';
      $scope.passwordRequired = '';

      if (!$scope.formInfo.name) {
        $scope.nameRequired = 'Name Required';
        isError = true;
      }

      if (!$scope.formInfo.email) {
        $scope.emailRequired = 'Email Required';
        isError = true;
      }

      if (!$scope.formInfo.password) {
        $scope.passwordRequired = 'Password Required';
        isError = true;
      }

      if (!isError) {
        $http.post('/user/new', $scope.formInfo).success(function () {
          $location.path('/login');
        }).error(function (err) {
          //TODO
          console.log(err, 'error occur')
        });

      }
    };
  });