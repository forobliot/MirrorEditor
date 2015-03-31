'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:SubsetCtrl
 * @description
 * # SubsetCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('SubsetCtrl', function ($scope, $http, $routeParams, $location, mirrorSvc) {
	var ownerGroup = mirrorSvc.getGroup();

	$http.get(mirrorSvc.apiurl + ownerGroup.id + '/subset/' + $routeParams.id).success(function(data) {
	    	$scope.subset = data;
	});

    $scope.go = function(path) {
    	$location.path(path);
    };

  });
