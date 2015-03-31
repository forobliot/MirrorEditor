'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:SubsetsCtrl
 * @description
 * # SubsetsCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('SubsetsCtrl', function ($scope, $http, mirrorSvc) {
  	var ownerGroup = mirrorSvc.getGroup();

  	if (ownerGroup) {
	  	$http.get(mirrorSvc.apiurl + ownerGroup.id + '/subsets').success(function(data) {
	  		$scope.subsets = data;
	  	});
  	}

  	$scope.sortableOptions = {

  	};

  	$scope.a = [ 'a', 'b', 'c'];
  });
