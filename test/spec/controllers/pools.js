'use strict';

describe('Controller: PoolsCtrl', function () {

  // load the controller's module
  beforeEach(module('mirrorEditorApp'));

  var PoolsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PoolsCtrl = $controller('PoolsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
