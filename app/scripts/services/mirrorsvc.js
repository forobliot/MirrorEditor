'use strict';

/**
 * @ngdoc service
 * @name mirrorEditorApp.mirrorSvc
 * @description
 * # mirrorSvc
 * Service in the mirrorEditorApp.
 */
angular.module('mirrorEditorApp')
  .service('mirrorSvc', function mirrorSvc($rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var settings = { };

    this.apiurl = 'http://mirroreditor.ctu.unimi.it/api/';
    // commentare se in produzione
    //this.apiurl = 'http://api.unimi.it/mirrorapi/';
    
    
    this.selectGroup = function(group) {
    	settings.ownersGroup = group;
    	$rootScope.ownersGroup = group;
        this.saveState();
    };

    this.selectSubset = function(subset) {
        if (subset) {
            settings.subset = subset;
        }
        else {
            delete settings.subset;
        }
        this.saveState();
    };

    this.getGroup = function() {
    	return settings.ownersGroup;
    };

    this.getSubset = function() {
        return settings.subset;
    };


    this.loadState = function() {
        if (sessionStorage.state) {
            settings = JSON.parse(sessionStorage.state);
            if (settings.ownersGroup) {
                $rootScope.ownersGroup = settings.ownersGroup;
            }
        }
    };

    this.saveState = function() {
        sessionStorage.state = JSON.stringify(settings);
    };

  });
