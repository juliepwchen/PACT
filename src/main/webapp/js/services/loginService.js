/**
 * Created by juliechen on 4/15/15.
 */
define(['app-config'], function (app) {

    app.register.factory('loginService', ['$resource',

        /* $resource created default methods
         'get':    {method:'GET'},
         'save':   {method:'POST'},
         'query':  {method:'GET', isArray:true},
         'remove': {method:'DELETE'},
         'delete': {method:'DELETE'}
         */
        function ($resource) {
            /* console.log("calling loginService..."); */

            return $resource (                         /* Use API_END_POINT to describe API server */
            '/jbossews-1.0/AuthenicateUser',
            {
                username: '@email',
                password: '@password'
            }, {                                     /* default values */
                    login: {
                        method: 'POST',
                        cache: false,
                        isArray: false,
                        /* headers: header */
                    }
                });
        }]);
});