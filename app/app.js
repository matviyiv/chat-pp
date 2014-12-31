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
          $rootScope.user = user;
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
  })

  .filter('codeFormatter', function() {
    return function(value) {
      return value; // format and prettify code here
    };
  })

  .directive('chatMsgDraggable', ['$document', function($document) {
    return function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       cursor: 'pointer'
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  }]);
