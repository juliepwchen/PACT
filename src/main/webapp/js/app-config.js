/**
 * Created by juliechen on 4/14/15.
 */
"use strict";

define(['angularAMD', 'angular-ui-router', 'angular-messages', 'angular-resource', 'angular-cookies', 'angular-ui-bootstrap'], function (angularAMD) {
    var app = angular.module("openInterviewApp", ['ngResource', 'ngMessages', 'ui.router', 'ngCookies', 'ui.bootstrap']);

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider

               .state ('login',  angularAMD.route({
                  url: '/Accounts/Login',
                  templateUrl: '/jbossews-1.0/Accounts/Login.html',
                  resolve: {

                    load: ['$q', '$rootScope', function ($q, $rootScope) {

                        var loadController = '/jbossews-1.0/Accounts/LoginController.js';
                        /* console.log ("loadController=" + loadController); */

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                  }
                }))

                .state ('logout',  angularAMD.route({
                  url: '/Accounts/Logout',
                  templateUrl: '/jbossews-1.0/Accounts/Logout.html',
                  resolve: {

                    load: ['$q', '$rootScope', function ($q, $rootScope) {

                      var loadController = '/jbossews-1.0/Accounts/LogoutController.js';
                      console.log ("loadController=" + loadController);

                      var deferred = $q.defer();
                      require([loadController], function () {
                        $rootScope.$apply(function () {
                          deferred.resolve();
                        });
                      });
                      return deferred.promise;
                    }]
                  }
                }))

                .state ('register',  angularAMD.route({
                  url: '/Accounts/Register',
                  templateUrl: '/jbossews-1.0/Accounts/Register.html',
                  resolve: {

                    load: ['$q', '$rootScope', function ($q, $rootScope) {

                        var loadController = '/jbossews-1.0/Accounts/RegisterController.js';
                        console.log ("loadController=" + loadController);

                        var deferred = $q.defer();
                        require([loadController], function () {
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });
                        return deferred.promise;
                    }]
                  }
                }))

                .state ('alberta',  angularAMD.route({
                  url: '/Alberta/AlbertaMap',
                  templateUrl: '/jbossews-1.0/Alberta/AlbertaMap.html',
                  resolve: {

                    load: ['$q', '$rootScope', function ($q, $rootScope) {

                      var loadController = '/jbossews-1.0/Alberta/AlbertaMapController.js';
                      console.log ("loadController=" + loadController);

                      var deferred = $q.defer();
                      require([loadController], function () {
                        $rootScope.$apply(function () {
                          deferred.resolve();
                        });
                      });
                      return deferred.promise;
                    }]
                  }
                }))

                .state ('hipreplacement',  angularAMD.route({
                  url: '/USAMap/State',
                  templateUrl: '/jbossews-1.0/USAMap/State.html',
                  resolve: {

                  load: ['$q', '$rootScope', function ($q, $rootScope) {

                  var loadController = '/jbossews-1.0/USAMap/StateController.js';
                  console.log ("loadController=" + loadController);

                  var deferred = $q.defer();
                    require([loadController], function () {
                      $rootScope.$apply(function () {
                        deferred.resolve();
                      });
                    });
                    return deferred.promise;
                    }]
                  }
                }))

                .state ('mortality',  angularAMD.route({
                  url: '/USAMap/MortalityMap',
                  templateUrl: '/jbossews-1.0/USAMap/MortalityMap.html',
                  resolve: {

                  load: ['$q', '$rootScope', function ($q, $rootScope) {

                  var loadController = '/jbossews-1.0/USAMap/MortalityMapController.js';
                  /* console.log ("loadController=" + loadController); */

                  var deferred = $q.defer();
                    require([loadController], function () {
                      $rootScope.$apply(function () {
                        deferred.resolve();
                      });
                    });
                    return deferred.promise;
                    }]
                  }
                }))

                .state ('housing',  angularAMD.route({
                  url: '/Housing/Housing',
                  templateUrl: '/jbossews-1.0/Housing/Housing.html',
                  resolve: {

                  load: ['$q', '$rootScope', function ($q, $rootScope) {

                  var loadController = '/jbossews-1.0/Housing/HousingController.js';
                  /* console.log ("loadController=" + loadController); */

                  var deferred = $q.defer();
                    require([loadController], function () {
                      $rootScope.$apply(function () {
                        deferred.resolve();
                      });
                    });
                    return deferred.promise;
                    }]
                  }
                }))

                .state ('usda',  angularAMD.route({
                  url: '/USDA/USDA',
                  templateUrl: '/jbossews-1.0/USDA/USDA.html',
                  resolve: {

                  load: ['$q', '$rootScope', function ($q, $rootScope) {

                  var loadController = '/jbossews-1.0/USDA/USDAController.js';
                  /* console.log ("loadController=" + loadController); */

                  var deferred = $q.defer();
                    require([loadController], function () {
                      $rootScope.$apply(function () {
                        deferred.resolve();
                      });
                    });
                    return deferred.promise;
                    }]
                  }
                }))

                .state ('usa',  angularAMD.route({
                  url: '/USAMap/USAMap',
                  templateUrl: '/jbossews-1.0/USAMap/USAMap.html',
                  resolve: {

                  load: ['$q', '$rootScope', function ($q, $rootScope) {

                  var loadController = '/jbossews-1.0/USAMap/USAMapController.js';
                  console.log ("loadController=" + loadController);

                  var deferred = $q.defer();
                    require([loadController], function () {
                      $rootScope.$apply(function () {
                        deferred.resolve();
                      });
                    });
                    return deferred.promise;
                    }]
                  }
                }));

            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            /* $httpProvider.defaults.headers.common['Authorization'] = '';
            $httpProvider.defaults.headers.common['X-XSRF-TOKEN'] = ''; */
        }]);

    var indexController = function ($scope, $rootScope, $http, $cookies, $location, $state) {
        $rootScope.authenticated = false;

        $scope.logout = function () {
          console.log("calling LogoutController...");
          /* window.location.replace("/jbossews-1.0/"); */

          /*
          $http.defaults.headers.common.Authorization = '';
          $http.defaults.headers.common['X-XSRF-TOKEN'] = '';
          $http.defaults.headers.common["X-Requested-With"] = ''; */

          $scope.user = {};
          $rootScope.authenticated = false;

          /*
          delete $cookies['XSRF-TOKEN'];
          delete $cookies['JSESSIONID']; */

          /* $cookies.remove("XSRF-TOKEN");
          $cookies.remove("JSESSIONID"); */

          /* $state.go("login"); */
          $location.path("/jbossews-1.0/");
        };

    };

    indexController.$inject = ['$scope', '$rootScope', '$http', '$cookies', '$location'];
    app.controller("indexController", indexController);

    angularAMD.bootstrap(app);

    return app;
});
