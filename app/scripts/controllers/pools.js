'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:PoolsCtrl
 * @description
 * # PoolsCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('PoolsCtrl', function ($scope, editorSvc) {
  	$scope.poolList = editorSvc.GetPoolList();
  	console.log($scope.poolList);
  });
