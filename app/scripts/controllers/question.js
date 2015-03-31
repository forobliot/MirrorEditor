'use strict';

var questionTypes = [
	{ label: 'true/false', value: 1 },
	{ label: 'scelta singola', value: 2 },
	{ label: 'scelta multipla', value: 3 },
	{ label: 'fill in the gap', value: 4 },
	{ label: 'fill in the gap con più risposte', value: 5 },
	{ label: 'range numerico', value: 6 },
	{ label: 'scelta multipla con minimo risposte corrette', value: 7 }
];

var typeWeights = [
    { label: '0 - pesi in test', value: 0 },
    { label: '1 - pesi in domanda', value: 1 },
    { label: '2 - pesi in opzioni', value: 2 }
];

/**
 * @ngdoc function
 * @name mirrorEditorApp.controller:QuestionCtrl
 * @description
 * # QuestionCtrl
 * Controller of the mirrorEditorApp
 */
angular.module('mirrorEditorApp')
  .controller('QuestionCtrl', function ($scope, $http, $routeParams, $location, mirrorSvc, toaster) {
    var ownerGroup = mirrorSvc.getGroup();
    $scope.subset = mirrorSvc.getSubset();

  	$scope.questionTypes = questionTypes;
    $scope.typeWeights = typeWeights;

  	if ($routeParams.id) {
	    $http.get(mirrorSvc.apiurl + ownerGroup.id + '/question/' + $routeParams.id).success(function(data) {
            if (data.type === 4 && !data.Data.Answers) {
                data.Data.Answers = [];
            }
	    	$scope.question = data;
            $scope.question.typeWeight = $scope.question.typeWeight || 0;
	    });
	}
	else {
		$scope.question = { id: 0 };
	}

    $scope.save = function() {
        var trueOptions = 0;
        switch ($scope.question.type) {
            case 1:
            case 2:
                if ($scope.question.Data.Options.length < 2) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda deve contenere almeno 2 opzioni.' });
                    return;
                }
                trueOptions = 0;
                angular.forEach($scope.question.Data.Options, function(option) {
                    trueOptions += option.IsCorrect ? 1 : 0;
                });
                if (trueOptions !== 1) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda deve contenere una opzione corretta.' });
                    return;
                }
                break;
            case 3:
                if ($scope.question.Data.Options.length < 2) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda deve contenere almeno 2 opzioni.' });
                    return;
                }
                break;
            case 5:
                if ($scope.question.Data.Answers.length < 1) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda deve contenere almeno una risposta.' });
                    return;
                }
                break;
            case 6:
                var _lowValue = $scope.question.Data.LowValue || '';
                var _highValue = $scope.question.Data.HighValue || '';
                if (angular.isNumber(_lowValue) && angular.isNumber(_highValue)) {
                    if (_lowValue > _highValue) {
                        toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'Range numerico non valido.' });
                        return;
                    }
                }
                break;
            case 7:
                if ($scope.question.Data.Options.length < 2) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda deve contenere almeno 2 opzioni.' });
                    return;
                }
                trueOptions = 0;
                angular.forEach($scope.question.Data.Options, function(option) {
                    trueOptions += option.IsCorrect ? 1 : 0;
                });

                if (trueOptions < $scope.question.Data.MinAnswer) {
                    toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'MinAnswer deve essere minore o uguale delle opzioni corrette.' });
                    return;
                }
                break;
        }

        if ($scope.xForm.$invalid) {
            toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: 'La domanda contiene degli errori. Controlla i dati.' });
            return;
        }

    	if ($scope.question.id) {
	    	$http.put(mirrorSvc.apiurl + ownerGroup.id + '/question/' + $scope.question.id, $scope.question)
            .success(function() {
                toaster.pop({ type: 'success', timeout: 2000, title: 'Domanda salvata', body: 'L\'operazione di salvataggio ha avuto successo' });
	    		$location.path('/question/' + $scope.question.id);
                $scope.xForm.$setPristine();
	    	})
            .error(function(data) {
                toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: data.Message });
            });
    	}
    	else {
	    	$http.post(mirrorSvc.apiurl + ownerGroup.id + '/question/', $scope.question).success(function(data) {
		    	$location.path('/question/' + data.id);
                toaster.pop({ type: 'success', timeout: 2000, title: 'Domanda salvata', body: 'La domanda è stata creata con successo successo' });
                $scope.xForm.$setPristine();
	    	})
            .error(function(data) {
                toaster.pop({ type: 'error', timeout: 5000, title: 'Domanda non salvata', body: data.Message });
            });
    	}
    };

    $scope.delete = function() {
    	if ($scope.question.id) {
	    	$http.delete(mirrorSvc.apiurl + ownerGroup.id + '/question/' + $scope.question.id).success(function() {
                toaster.pop({ type: 'success', timeout: 2000, title: 'Domanda eliminata', body: 'La domanda è stata eliminata' });
	    		$location.path('/questions');
	    	});
		}    	
    };

    $scope.go = function(path) {
    	$location.path(path);
    };

    $scope.choose = function(type) {
        $http.get(mirrorSvc.apiurl + ownerGroup.id + '/nextref').success(function(data) {
            $scope.question.questionRef = data;
            switch (type) {
                case 1:
                    $scope.question.Data = { Options: [ { Label: 'Vero', IsCorrect: true }, { Label: 'Falso' }] };
                    break;
                case 2:
                    $scope.question.Data = { Options: [ { Label: 'opzione 1', IsCorrect: true }, { Label: 'Opzione 2' }] };
                    break;
                case 3:
                    $scope.question.Data = { Options: [ { Label: 'opzione 1', IsCorrect: true }, { Label: 'Opzione 2' }] };
                    break;
                case 4:
                    $scope.question.Data = { Answers: [ 'risposta' ] };
                    break;
                case 5:
                    $scope.question.Data = { Answers: [ 'risposta 1', 'risposta 2' ] };
                    break;
                case 6:
                    $scope.question.Data = { LowValue: 1.0, HighValue: 2.0 };
                    break;
                case 7:
                    $scope.question.Data = { Options: [ { Label: 'opzione 1', IsCorrect: true }, { Label: 'Opzione 2' }] };
                    break;
            }

            $scope.question.type = type;
            $scope.question.typeWeight = 0;
        });

    };

    $scope.singleselect = function(option) {
    	if ($scope.question.type === 1 || $scope.question.type === 2) {
			angular.forEach($scope.question.Data.Options, function(value) {
				if (option.IsCorrect && option !== value) {
					value.IsCorrect = false;
				}
			});
		}
    };

    $scope.deleteOption = function(index) {
    	if (index > -1) {
    		$scope.question.Data.Options.splice(index,1);
    	}
    };

    $scope.addOption = function() {
        $scope.xForm.$setDirty();
    	$scope.question.Data.Options.push({ Label: 'opzione ' + ($scope.question.Data.Options.length + 1), IsCorrect: false, Weight: 0 });
    };

    $scope.invertOption = function(direction, index) {
        switch (direction) {
            case -1:
                if (index <= 0) {
                    return;
                }
                break;
            case 1:
                if (index + 1 >= $scope.question.Data.Options.length) {
                    return;
                }
                break;
        }

        $scope.xForm.$setDirty();

        var option = $scope.question.Data.Options[index];
        $scope.question.Data.Options[index] = $scope.question.Data.Options[index + direction];
        $scope.question.Data.Options[index + direction] = option;

    };

    $scope.deleteAnswer = function(index) {
    	if (index > -1) {
    		$scope.question.Data.Answers.splice(index,1);
    	}
    };

    $scope.addAnswer = function() {
    	$scope.question.Data.Answers.push('risposta ' + ($scope.question.Data.Answers.length + 1));
    };

    $scope.cancel = function() {
        if ($scope.xForm.$dirty) {
            $scope.cancelConfirm = true;
        }
        else {
            $scope.go('/questions');
        }
    };
  });
