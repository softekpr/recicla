(function () {
    'use strict';

    angular.module('recicla')
        .factory('Location', ['$resource', function ($resource) {
            return $resource('/api/locations', {}, {
                fetch: {method: 'POST', isArray: true, transformResponse: function (data) {
                    var array = angular.fromJson(data);
                    return _.map(array, function (location) {
                        return {
                            id: location._id,
                            position: {latitude: location.coordinates.lat, longitude: location.coordinates.lng},
                            options: {
                                title: location.name
                            },
                            label: _(location.materials).map(function (material) {
                                return '<i class="' + material.cssClass + '"></i>';
                            }).join(''),
                            location: location
                        };
                    });
                }}
            });
        }]);
})();