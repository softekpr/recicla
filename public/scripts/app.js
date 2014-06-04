(function () {
    'use strict';

    var LN3 = 1.0986122886681098;

    angular.module('recicla', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'mgcrea.ngStrap.modal', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.button', 'geolocation', 'google-maps'])
        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        })
        .filter('tel', function () {
            return function (phoneNumber) {
                if (!phoneNumber) {
                    return phoneNumber;
                }

                return formatLocal('US', phoneNumber);
            };
        })
        .filter('split', function () {
            return function (string, separator) {
                string = string || '';
                return string.split(separator);
            };
        })
        .run(function ($rootScope, $aside) {
            $rootScope.mobileMenu = $aside({
                scope: $rootScope,
                title: 'Categor\u00EDas',
                template: 'scripts/templates/aside.html',
                contentTemplate: 'scripts/templates/menu.html',
                show: false,
                placement: 'right',
                animation: 'am-slide-right'
            });

            $rootScope.cluster = {
                cluster: true,
                clusterOpts: {
                    averageCenter: true,
                    gridSize: 40,
                    calculator: function (ary, num) {
                        return {
                            text: ary.length,
                            index: Math.min(Math.floor(Math.log(ary.length) / LN3) + 1, num),
                            title: ary.length + ' localidades'
                        };
                    }
                }
            };

            $rootScope.openMenu = function () {
                $rootScope.mobileMenu.$promise.then(function () {
                    $rootScope.mobileMenu.show();
                });
            };

            $rootScope.$watch('categories', function (/*newValue, oldValue*/) {
                console.log('categories changed!');
            }, true);
        });
}());
