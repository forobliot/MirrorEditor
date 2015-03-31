'use strict';

describe('Controller: QsingleCtrl', function () {

  // load the controller's module
  beforeEach(module('mirrorEditorApp'));

  var QsingleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QsingleCtrl = $controller('QsingleCtrl', {
      $scope: scope
    });
  }));

  it('should initialize question', function () {
    var q = {
      title: 'Questo è il testo della domanda',
      introduction: 'Questa è l\'introduzione',
      options: [
        { text: 'Opzione 1' },
        { text: 'Opzione 2', isCorrect: true },
        { text: 'Opzione 3' },
        { text: 'Opzione 4' },
        { text: 'Opzione 5' }
      ]
    };
    expect(scope.question).toEqual(q);
  });

  it('add option', function () {
    var originalOptionsCount = scope.question.options.length;

    scope.addOption();
    
    expect(scope.question.options.length).toEqual(originalOptionsCount + 1);
    
    var newOption = { text: 'Opzione ' + (originalOptionsCount + 1).toString() };

    expect(scope.question.options[scope.question.options.length - 1]).toEqual(newOption);
  });

  it('delete option', function () {
    var originalOptionsCount = scope.question.options.length;
    
    while (originalOptionsCount > 0) {
      scope.deleteOption();
    
      expect(scope.question.options.length).toEqual(originalOptionsCount - 1);

      originalOptionsCount--;
    }

    scope.deleteOption();

    expect(scope.question.options.length).toEqual(0);
  });

});
