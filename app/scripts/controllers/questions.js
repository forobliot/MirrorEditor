'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:QuestionsCtrl
 * @description
 * # QuestionsCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('QuestionsCtrl', function ($scope, $routeParams, mirrorSvc) {
	$scope.mirrorSvc = mirrorSvc;
  	if (mirrorSvc.ownerGroup) {
  	  	mirrorSvc.getQuestions();
	}
  });
