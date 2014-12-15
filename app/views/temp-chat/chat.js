'use strict';

angular.module('chatApp.tempchat', ['ngRoute', 'ngDraggable'])

  .controller('ChatMainTempCtrl', function ($scope, $http) {
    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {
      $scope.centerAnchor = !$scope.centerAnchor
    };
    $http.get('/chat/list')
      .success(function (data) {
        $scope.availableChats = data;
        $scope.droppedChat = [];
        $scope.onDropComplete = function (data, evt) {
          if ($scope.droppedChat.length !== 0) {
            $scope.droppedChat = [];
          }

          $scope.droppedChat.push(data);
        };
        $scope.onDragSuccess = function (data, evt) {
          //var index = $scope.droppedChat.indexOf(data);
          //if (index > -1) {
          //  $scope.droppedChat.splice(index, 1);
          //}
          $scope.droppedChat = [];
        };
      })
      .error(function () {

      });
  });