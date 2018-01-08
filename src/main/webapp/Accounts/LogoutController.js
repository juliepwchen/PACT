/**
 * Created by juliechen on 5/17/15.
 */
"use strict";
define(['app-config', 'angular-cookies'], function (app) {
    app.register.controller('LogoutController', ['$rootScope', '$timeout','$state', '$scope', '$location', '$http', '$cookies',
        function (rsc, tm, st, sc, loc, hp, ck) {

            sc.user = {};
            rsc.authenticated = false;
            loc.path('/jbossews-1.0/');
            /* ck.remove('openInterviewApp'); */

            sc.logout = function () {
              console.log("calling LogoutController...");

              sc.user = {};
              rsc.authenticated = false;

            };

        }]);
});