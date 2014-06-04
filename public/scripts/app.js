(function() {
    'use strict';

    angular.module('recicla', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.button', 'geolocation', 'google-maps'])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        })
        .run(function($rootScope, $aside) {
            $rootScope.mobileMenu = $aside({
                scope: $rootScope,
                title: 'Categor\u00EDas',
                template: 'scripts/templates/aside.html',
                contentTemplate: 'scripts/templates/menu.html',
                show: false,
                placement: 'right',
                animation: 'am-slide-right'
            });

            $rootScope.openMenu = function() {
                $rootScope.mobileMenu.$promise.then(function() {
                    $rootScope.mobileMenu.show();
                });
            };
        });
})();