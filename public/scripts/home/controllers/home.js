(function() {
    'use strict';

    angular.module('recicla')
        .controller('HomeController', function($scope, $rootScope, $window) {
            $scope.message = 'Hello Dude!';

            var resizeElements = function () {
                var mapHeight = angular.element($window).height() - angular.element('#navigation').height();
                angular.element('#map .angular-google-map-container').height(mapHeight);
                angular.element('#desktop-menu').height(angular.element($window).height());
            };

            $scope.$on('$viewContentLoaded', function () {
                angular.element($window).bind('resize', resizeElements);
                resizeElements();
            });
        })
        .config(function($routeProvider) {
            $routeProvider.when('/', {
                controller: 'HomeController',
                templateUrl: 'scripts/home/views/home.html'
            });
        });
})();