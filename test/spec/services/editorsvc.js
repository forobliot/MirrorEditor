'use strict';

describe('Service: editorSvc', function () {

  // load the service's module
  beforeEach(module('mirrorEditorApp'));

  // instantiate service
  var editorSvc;
  beforeEach(inject(function (_editorSvc_) {
    editorSvc = _editorSvc_;
  }));

  it('should do something', function () {
    expect(!!editorSvc).toBe(true);
  });

});
