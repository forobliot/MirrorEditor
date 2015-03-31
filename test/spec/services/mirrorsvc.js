'use strict';

describe('Service: mirrorSvc', function () {

  // load the service's module
  beforeEach(module('mirrorEditorApp'));

  // instantiate service
  var mirrorSvc;
  beforeEach(inject(function (_mirrorSvc_) {
    mirrorSvc = _mirrorSvc_;
  }));

  it('should do something', function () {
    expect(!!mirrorSvc).toBe(true);
  });

});
