'use strict';

var extractionModes = [
	{ label: 'pescaggio casuale', value: 1 },
	{ label: 'serbatoi pesati', value: 2 },
	{ label: 'sequenziale', value: 3 }
];

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('TestCtrl', function ($scope, $http, $routeParams, $location, mirrorSvc) {
  	$scope.extractionModes = extractionModes;

  	if ($routeParams.id) {
	    $http.get(mirrorSvc.apiurl + 'test/' + $routeParams.id).success(function(data) {
	    	$scope.test = data;
	    });
	}
	else {
		$scope.test = { id: 0, extraction: 1 };
	}


    $scope.save = function() {
    	if ($scope.test.id) {
	    	$http.put(mirrorSvc.apiurl + 'test/' + $scope.test.id, $scope.test).success(function() {
	    		//$location.path('/tests');
	    	});
    	}
    	else {
	    	$http.post(mirrorSvc.apiurl + 'test/', $scope.test).success(function(data) {
		    	$location.path('/test/' + data.id);
	    	});
    	}
    };

    $scope.delete = function() {
    	if ($scope.test.id) {
	    	$http.delete(mirrorSvc.apiurl + 'test/' + $scope.test.id).success(function() {
	    		$location.path('/tests');
	    	});
		}    	
    };

    $scope.go = function(path) {
    	$location.path(path);
    };
  });
