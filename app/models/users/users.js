'use strict';

angular.module('Users', [])
.config(function() {
  // ...
})
.run(function() {
  // ...
})
.factory('listUsers', function ($http) {
  return {
    get: function(callback) {
      $http.get('/user/list').
      success(function(data, status, headers, config) {
        callback(data);
      }).
      error(function(data, status, headers, config) {
        callback(['No Users Found!'])
      });
    }
  }
});