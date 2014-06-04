(function () {
    'use strict';

    angular.module('recicla')
        .controller('HomeController', function ($scope, $rootScope, $window, $resource, $timeout, geolocation, filterFilter, Material, Location, User) {
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport: true, draggable: true, suppressMarkers: true});
            var loaded = false;
            var selectedMarker;
            var heatMapLayer;


            function fetchGeolocation() {
                geolocation.getLocation({maximumAge: Infinity}).then(function (position) {
                    $scope.initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    $scope.homeMarker.location = position.coords;
                    $scope.homeMarker.options.visible = true;
                    $scope.map.center.latitude = $scope.initialLocation.lat();
                    $scope.map.center.longitude = $scope.initialLocation.lng();
                    $scope.map.zoom = 14;
                }, function (reason) {
                    console.log('Geolocation failed: ' + reason);
                    console.log('Trying again...');
                    fetchGeolocation();
                });
            }

            $scope.$on('error', function (event, desc) {
                console.log('Geolocation failed: ' + desc);
                console.log('Trying again...');
                fetchGeolocation();
            });

            fetchGeolocation();

            var refreshPromise = null;

            $scope.initialLocation = null;

            $scope.homeMarker = {
                location: {
                    latitude: 0,
                    longitude: 0
                },
                options: {
                    visible: false,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                }
            };
            $scope.map = {
                control: {

                },
                center: {
                    latitude: 0,
                    longitude: 0
                },
                zoom: 4,
                events: {
                    tilesloaded: function (map) {
                        $scope.$apply(function () {
                            $scope.mapInstance = map;
                        });
                        if (!loaded) {
                            directionsDisplay.setMap(map);
                        }
                        loaded = true;
                    },
                    /*jshint camelcase: false */
                    bounds_changed: function () {
                        if (refreshPromise) {
                            $timeout.cancel(refreshPromise);
                        }
                        refreshPromise = $timeout(function () {
                            refreshMapData($scope.categories);
                        }, 500);
                    }
                },
                heatMap: {
                    callback: function (layer) {
                        heatMapLayer = layer;
                    },
                    show: false,
                    options: {
                        radius: 30
                    }
                },
                options: {
                    streetViewControl: false
                }
            };
            $rootScope.categories = Material.query();
            $scope.categories = $rootScope.categories;

            var resizeElements = function () {
                var mapHeight = angular.element($window).height() - angular.element('#navigation').height();
                angular.element('#map .angular-google-map-container').height(mapHeight);
                angular.element('#desktop-menu').height(angular.element($window).height());
            };

            $scope.$on('$viewContentLoaded', function () {
                angular.element($window).bind('resize', resizeElements);
                resizeElements();
            });

            function fetchLocations(categories) {
                if (!$scope.map.control.getGMap() || !$scope.initialLocation) { return; }
                var selectedCategories = filterFilter(categories, {selected: true});
                if (selectedCategories.length === 0) {
                    $scope.markers = [];
                } else {
                    var b = $scope.map.control.getGMap().getBounds();
                    var req = {
                        'box': [
                            {'lat': b.getSouthWest().lat(), 'lng': b.getSouthWest().lng()},
                            {'lat': b.getNorthEast().lat(), 'lng': b.getNorthEast().lng()}
                        ],
                        'userLocation': {'lat': $scope.initialLocation.lat(), 'lng': $scope.initialLocation.lng()},
                        'materials': selectedCategories.map(function (category) {
                            return category.name;
                        })
                    };
                    var locations = Location.fetch(req, function () {
                        angular.forEach(locations, function (location) {
                            location.doClick = markerClick(location);
                            location.options.visible = !$scope.map.heatMap.show;
                            location.options.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
                        });
                        $scope.markers = locations;
                    });
                }
            }

            function fetchHeatMapData(categories) {
                if (!$scope.map.control.getGMap() || !$scope.initialLocation) {
                    return;
                }
                var selectedCategories = filterFilter(categories, {selected: true});
                if (selectedCategories.length === 0) {
                    $scope.markers = [];
                } else {
                    var b = $scope.map.control.getGMap().getBounds();
                    var bbox = [
                        {'lat': b.getSouthWest().lat(), 'lng': b.getSouthWest().lng()},
                        {'lat': b.getNorthEast().lat(), 'lng': b.getNorthEast().lng()}
                    ];
                    User.fetch({
                        box: bbox,
                        materials: selectedCategories.map(function (category) {
                            return category.name;
                        })
                    }, function (userArray) {
                        $scope.$evalAsync(function () {
                            heatMapLayer.setData(new google.maps.MVCArray(_.map(userArray, function (user) {
                                return new google.maps.LatLng(user.coordinates.lat, user.coordinates.lng);
                            })));
                        });
                    });
                }
            }

            function refreshMapData(categories) {
                if($scope.map.heatMap.show) {
                    fetchHeatMapData(categories);
                } else {
                    fetchLocations(categories);
                }
            }

            $scope.$watch('categories', refreshMapData, true);
            $scope.$watch('map.heatMap.show', function (showHeatMap) {
                refreshMapData($scope.categories);
                angular.forEach($scope.markers, function (marker) {
                    marker.options.visible = !showHeatMap;
                });
            });
            $scope.markers = [];
            $scope.selectedMarker = null;
            $scope.showInfoPanel = false;

            var markerClick = function (marker) {
                return function () {
                    $scope.$apply(function () {
                        var request = {
                            origin: $scope.initialLocation,
                            destination: new google.maps.LatLng(marker.position.latitude, marker.position.longitude),
                            travelMode: google.maps.TravelMode.DRIVING
                        };
                        directionsService.route(request, function (result, status) {
                            if (status === google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                            } else {
                                console.log('Error routing.');
                            }
                        });
                        selectedMarker = marker;
                        $scope.showRoute = true;
                        $scope.selectedMarker = angular.copy(marker);
                        $scope.showInfoPanel = true;
                    });
                };
            };
        })
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                controller: 'HomeController',
                templateUrl: 'scripts/home/views/home.html'
            });
        });
})();