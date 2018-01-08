/**
 * Created by juliechen on 4/12/15.
 */
"use strict";
define(['app-config', 'angular-cookies', 'loginService'], function (app) {
    app.register.controller('LoginController', ['$rootScope', '$timeout','$state', '$scope', '$location', '$http', 'loginService',
        function (rsc, tm, st, sc, loc, hp, loginService) {

            /* console.log("calling LoginController..."); */

            var authenticate = function(user, callback) {

                var headerAuth = user ? "Basic "
                    + btoa(user.email + ":"
                    + user.password) : '';

                hp.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
                hp.defaults.headers.common.Authorization = headerAuth;
                /* console.log("Header=:" + JSON.stringify(headerAuth)); */

                loginService.login({
                  user
                })
                    .$promise.then (
                    function (response) {
                        /* console.log("Success:" + JSON.stringify(response)); */

                        if (response.IsAuthenicated) {
                            rsc.authenticated = true;
                            /* console.log("LoginController current state is: " + JSON.stringify(st.current)); */
                        } else {
                            rsc.authenticated = true;
                        }
                        callback && callback();
                    },
                    function (errorResponse) {
                        /* console.log("Error:" + JSON.stringify(errorResponse)); */
                        rsc.authenticated = false;
                        callback && callback();
                    }
                );
            }

            sc.user = {};
            sc.login = function () {

                /* console.log("User:" + JSON.stringify(sc.user)); */

                authenticate(sc.user, function() {
                    if (rsc.authenticated) {
                        /* console.log("Login succeeded"); */
                        /* st.go('alberta');
                        loc.path('/jbossews-1.0/Alberta/AlbertaMap.html'); */

                        /* st.go('hipreplacement');
                        loc.path('/jbossews-1.0/USAMap/State.html'); */

                        /* st.go('mortality');
                        loc.path('/jbossews-1.0/USAMap/MortalityMap.html'); */

                        /* st.go('housing');
                        loc.path('/jbossews-1.0/Housing/Housing.html'); */

                        st.go('usda');
                        loc.path('/jbossews-1.0/USDA/USDA.html');

                        sc.error = false;

                    } else {
                        console.log("Inside sc.login: Login failed");
                        hp.defaults.headers.common['Authorization'] = ''
                        hp.defaults.headers.common['X-XSRF-TOKEN'] = '';
                        sc.user = {};
                        st.go('logout');
                        loc.path('/jbossews-1.0/Accounts/Logout.html');
                        sc.error = true;
                    }
                })
            };

            sc.fblogin = function () { return checkLoginState(); }

        }]);
});