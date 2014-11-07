'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
