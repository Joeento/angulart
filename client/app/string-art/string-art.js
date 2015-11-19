'use strict';

angular.module('angulartApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('string-art', {
        url: '/string-art',
        templateUrl: 'app/string-art/string-art.html',
        controller: 'StringArtCtrl'
      });
  });