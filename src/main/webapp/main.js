/**
 * Created by juliechen on 4/13/15.
 */
require.config({

    //By default load any module IDs from baseUrl
    //baseUrl is normally set to the same directory as the script used in a data-main attribute
    baseUrl: "",

    // paths config is relative to the baseUrl
    // never includes a ".js" extension since the paths config could be for a directory.
    // ex: app: 'app' means if the module ID starts with "app", load it from the /app directory
    paths: {
        'app-config': 'js/app-config',
        'angular': 'js/library/angular.min-1.3.15',
        'angular-ui-router': 'js/library/angular-ui-router-0.2.13',
        'angular-ui-bootstrap': 'js/library/ui-bootstrap-tpls-0.13.0.min',
        'angular-resource': 'js/library/angular-resource.min-1.3.15',
        'angular-cookies': 'js/library/angular-cookies.min-1.3.15',
        'angular-messages': 'js/library/angular-messages.min-1.3.15',
        'angularAMD': 'js/library/angularAMD.min-4.13.2015',
        'loginService': 'js/services/loginService',
        'compareToDirective': 'js/directive/compareToDirective',
        'topojson': 'js/library/topojson.v1.min',
        'd3': 'js/library/d3-3.5.5.min',
        'queue': 'js/library/queue.min'
    },

    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {

        'angularAMD': ['angular'],
        'angular-ui-router': ['angular'],    //depends on angular module
        'angular-ui-bootstrap': ['angular'],
        'angular-resource': ['angular'],
        'angular-cookies': ['angular'],
        'angular-messages': ['angular'],
        'compareToDirective': ['angular'],
        'd3': {exports:'d3'},
        'queue': { deps: ['d3'], exports: 'queue'},
        'topojson': { deps: ['d3'], exports: 'topojson'}
    },

    // kick start application
    deps: ['app-config']
});