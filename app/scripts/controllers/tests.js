'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:TestsCtrl
 * @description
 * # TestsCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('TestsCtrl', function ($scope, $http, mirrorSvc) {
  	var ownerGroup = mirrorSvc.getGroup();

  	if (ownerGroup) {
	  	$http.get(mirrorSvc.apiurl + ownerGroup.id + '/tests').success(function(data) {
	  		$scope.tests = data;
	  	});
  	}
 });
