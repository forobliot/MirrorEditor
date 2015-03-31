'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:PoolCtrl
 * @description
 * # PoolCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('PoolCtrl', function ($scope, $routeParams, editorSvc) {
  	$scope.pool = editorSvc.GetPool($routeParams.poolid);
  });
