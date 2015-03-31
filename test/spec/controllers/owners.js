'use strict';

describe('Controller: OwnersCtrl', function () {

  // load the controller's module
  beforeEach(module('mirrorEditorApp'));

  var OwnersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OwnersCtrl = $controller('OwnersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
