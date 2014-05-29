(function() {
    'use strict';

    angular.module('recicla', ['ngRoute', 'ngResource', 'ui.bootstrap'])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        });
})();