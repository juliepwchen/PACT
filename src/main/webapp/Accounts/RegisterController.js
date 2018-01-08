/**
 * Created by juliechen on 4/22/15.
 */
"use strict";
define(['app-config', 'compareToDirective'], function (app) {
    app.register.controller('RegisterController', ['$scope', '$location', 'compareToDirective',
        function (sc, loc) {
            console.log("calling RegisterController...");

            sc.submitForm = function(isValid) {

                // check to make sure the form is completely valid
                if (isValid) {
                    alert('our form is amazing');
                }

            };

        }]);
});