'use strict';

angular.module('angulartApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];

    $scope.projects = [
      {
        name: 'String Art',
        slug: 'string-art'
      },
      {
        name: 'Coming Soon',
        slug: 'coming-soon'
      }
    ];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });
