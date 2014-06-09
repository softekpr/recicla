(function () {
    'use strict';

    var LN3 = 1.0986122886681098;

    angular.module('recicla', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'mgcrea.ngStrap', 'mgcrea.ngStrap.aside', 'mgcrea.ngStrap.button', 'geolocation', 'google-maps'])
        .config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }])
        .filter('tel', function () {
            var format = function(phoneNumber) {
                return '(' + phoneNumber.substring(0, 3) + ') ' + phoneNumber.substring(3, 6) + '-' + phoneNumber.substring(6);
            };
            return function (phoneNumber) {
                if (!phoneNumber) {
                    return phoneNumber;
                }

                if(phoneNumber.length >= 10) {
                    return phoneNumber.substring(0,phoneNumber.length-10) + format(phoneNumber.substring(phoneNumber.length-10));
                } else {
                    return phoneNumber;
                }
            };
        })
        .filter('split', function () {
            return function (string, separator) {
                string = string || '';
                return string.split(separator);
            };
        })
        .run(['$rootScope', function ($rootScope) {

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

        }]);
})();
