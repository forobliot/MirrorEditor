'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('QuestionsCtrl', function ($scope, $http, $routeParams, mirrorSvc) {
  	var ownerGroup = mirrorSvc.getGroup();

  	if (ownerGroup) {
  		if ($routeParams.subsetid) {
 			// guardo se lo trovo in cache
 			$scope.subset = mirrorSvc.getSubset();
  			console.log($scope.subset);
 			if (!$scope.subset) {
	  			$http.get(mirrorSvc.apiurl + ownerGroup.id + '/subset/' + $routeParams.subsetid).success(function(data) {
	  				$scope.subset = data;
	  				mirrorSvc.selectSubset($scope.subset);
	  			});	
  			}
  		}
  		else {
  			mirrorSvc.selectSubset(null);
  		}

  		var url = mirrorSvc.apiurl + ownerGroup.id + '/questions' + ($routeParams.subsetid ? '/insubset/' + $routeParams.subsetid : '');
  	  	$http.get(url).success(function(data) {
	  		$scope.questions = data;
	  	});
	}
  });
