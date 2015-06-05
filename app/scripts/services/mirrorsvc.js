'use strict';

/**
 * @ngdoc service
 * @name mirrorEditorApp.mirrorSvc
 * @description
 * # mirrorSvc
 * Service in the mirrorEditorApp.
 */
angular.module('mirrorEditorApp')
  .service('mirrorSvc', function mirrorSvc($http) {
	var self = this;
	
    // AngularJS will instantiate a singleton by calling "new" on this function
    var settings = { };

    this.apiurl = 'http://mirroreditor.ctu.unimi.it/api/';
    // commentare se in produzione
    //this.apiurl = 'http://api.unimi.it/mirrorapi/';
	
	this.activeMenuz = 'owners';
	this.questions = [];
	this.ownerGroup = null;
	this.page = 0;
	this.perPage = 10;
	this.selectedQuestion = null;
    
    
    this.selectGroup = function(group) {
    	settings.ownerGroup = this.ownerGroup = group;
        this.saveState();
    };


    this.loadState = function() {
        if (sessionStorage.state) {
            settings = JSON.parse(sessionStorage.state);
            if (settings.ownerGroup) {
                self.ownerGroup = settings.ownerGroup;
				this.page = 0;
				self.getQuestions();
            }
        }
    };

    this.saveState = function() {
        sessionStorage.state = JSON.stringify(settings);
    };
	
	this.getOwners = function() {
		return $http.get(self.apiurl + 'owners').success(function() {
			self.activeMenu = 'owners';
			self.selectedQuestion = null;
		});
	};
	
	this.getQuestions = function(avoidUiRefresh) {
  		var url = self.apiurl + self.ownerGroup.id + '/questions';
  	  	return $http.get(url).success(function(data) { 
			self.questions = data; 
			if (!avoidUiRefresh) {
				self.selectedQuestion = null;
				self.activeMenu = 'questions';
				self.page = 0;
			}
		});
	};
	
	this.getQuestion = function(questionId) {
		if (questionId) {
			return $http.get(self.apiurl + self.ownerGroup.id + '/question/' + questionId).success(function(data) {
				self.selectedQuestion = data;
				
				// controlla se fuori pagina;
				var index = -1;
				for (var i = 0; i < self.questions.length; i++) {
					if (self.questions[i].Id === self.selectedQuestion.id) {
						index = i;
						break;
					}
				}
				
				if (index >= 0) {
					self.page = Math.floor(index / self.perPage);
				}
				
				self.activeMenu = 'questions';
				
			});
		}
		else
		{
			self.selectedQuestion = null;
			self.activeMenu = 'newquestion';
			
			return { success: function(f) { f({ id: 0 }); } };
		}
	};

  });
