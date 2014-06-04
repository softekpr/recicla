(function() {
    'use strict';

    angular.module('recicla', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.button', 'geolocation', 'google-maps'])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        });
})();