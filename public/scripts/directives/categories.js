(function () {
    'use strict';
    angular.module('recicla')
        .directive('categories', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/templates/categories.html'
            };
        });
})();