(function() {
    'use strict';

    angular.module('recicla', ['ngRoute', 'ngResource', 'ui.bootstrap'])
        .config(function($routeProvider) {
            $routeProvider.otherwise({
                redirectTo: '/'
            });
        });
})();