(function () {
    'use strict';

    angular.module('recicla')
        .factory('Material', function ($resource) {
            return $resource('/api/materials');
        });
}());