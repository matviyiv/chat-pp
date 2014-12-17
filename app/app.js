'use strict';

angular.module('chatApp', [
  'chatApp.chat',
  'chatApp.new',
  'chatApp.login',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
      var deferred = $q.defer();

      $http.get('/loggedin').success(function (user) {
        if (user !== '0') {
          $timeout(deferred.resolve, 0);
        }
        else {
          $rootScope.message = 'You need to log in.';
          $timeout(function () {
            deferred.reject();
          }, 0);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $httpProvider.interceptors.push(function ($q, $location) {
      return function (promise) {
        return promise.then(
          function (response) {
            return response;
          },
          function (response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html'
      })
      .when('/chat', {
        templateUrl: 'views/chat/chat.html',
        controller: 'ChatCtrl',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .when('/login', {
        templateUrl: 'views/user/login.html',
        controller: 'LoginController'
      })
      .when('/user/new', {
        templateUrl: 'views/user/new.html',
        controller: 'NewCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  })

  .run(function ($rootScope, $http) {
    $rootScope.message = '';

    $rootScope.logout = function () {
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
  })

  .controller('ApplicationController', function ($scope) {
  })
  
  .factory('chatSocket', function (socketFactory) {
    var socket = socketFactory();
    socket.forward('msgBroadcast');
    return socket;
  });
