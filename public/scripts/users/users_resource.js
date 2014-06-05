(function () {
    'use strict';

    angular.module('recicla')
        .factory('User', ['$resource', function ($resource) {
            return $resource('/api/users', {}, {
                fetch: { method: 'GET', isArray: true },
                save: { method:'POST' }
            });
        }]);
})();