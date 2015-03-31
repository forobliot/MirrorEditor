'use strict';

/**
 * @ngdoc overview
 * @name mirrorEditorApp
 * @description
 * # mirrorEditorApp
 *
 * Main module of the application.
 */
angular
  .module('mirrorEditorApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toaster'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/qSingle', {
        templateUrl: 'views/qsingle.html',
        controller: 'QsingleCtrl'
      })
      .when('/set', {
        templateUrl: 'views/set.html',
        controller: 'SetCtrl'
      })
      .when('/setList', {
        templateUrl: 'views/setlist.html',
        controller: 'SetlistCtrl'
      })
      .when('/pools', {
        templateUrl: 'views/pools.html',
        controller: 'PoolsCtrl'
      })
      .when('/pool/:poolid', {
        templateUrl: 'views/pool.html',
        controller: 'PoolCtrl'
      })
      .when('/test/:id?', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .when('/tests', {
        templateUrl: 'views/tests.html',
        controller: 'TestsCtrl'
      })
      .when('/questions', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/questions/insubset/:subsetid', {
        templateUrl: 'views/questions.html',
        controller: 'QuestionsCtrl'
      })
      .when('/question/:id?', {
        templateUrl: 'views/question.html',
        controller: 'QuestionCtrl'
      })
      .when('/owners', {
        templateUrl: 'views/owners.html',
        controller: 'OwnersCtrl'
      })
      .when('/subsets', {
        templateUrl: 'views/subsets.html',
        controller: 'SubsetsCtrl'
      })
      .when('/subset/:id?', {
        templateUrl: 'views/subset.html',
        controller: 'SubsetCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function(mirrorSvc) {

    mirrorSvc.loadState();
  })


;