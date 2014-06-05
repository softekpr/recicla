(function () {
    'use strict';

    angular.module('recicla')
        .factory('Material', ['$resource', function ($resource) {
            return $resource('/api/materials');
        }]);
})();