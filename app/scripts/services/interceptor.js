'use strict';

/**
 * @ngdoc service
 * @name mirrorEditorApp.interceptor
 * @description
 * # interceptor
 * Factory in the mirrorEditorApp.
 */
angular.module('mirrorEditorApp')
  .factory('interceptor', function ($q, $window, $location) {
    return {
      response: function (response) {
        if (response.status === 401) {
          console.log('Response 401');
        }
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        if (rejection.status === 401) {
          console.log('Response Error 401', rejection);
          var loginUrl = 'http://www.elearning.unimi.it/authentication/portal/login.aspx?url=' + encodeURIComponent($location.absUrl());
          console.log(loginUrl);
          $window.location.href = loginUrl;
        }
        return $q.reject(rejection);
      }
    };
  });
