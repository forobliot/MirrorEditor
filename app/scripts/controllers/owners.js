'use strict';

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:OwnersCtrl
 * @description
 * # OwnersCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('OwnersCtrl', function ($scope, $http, mirrorSvc, toaster) {
  	$http.get(mirrorSvc.apiurl + 'owners').success(function(data) {
  		$scope.owners = data;

  		$scope.selectGroup = function(g) {
			toaster.pop({ type: 'success', timeout: 2000, title: 'Gruppo ' + g.groupName + ' selezionato' });

  			mirrorSvc.selectGroup(g);
  		};
  });
});
