'use strict';

describe('Controller: SubsetCtrl', function () {

  // load the controller's module
  beforeEach(module('mirrorEditorApp'));

  var SubsetCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubsetCtrl = $controller('SubsetCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
