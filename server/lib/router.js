(function() {
    'use strict';

    var categoryController = require('./controllers/categories'),
        locationController = require('./controllers/locations'),
        materialController = require('./controllers/materials'),
        userController = require('./controllers/users');

    var Router = function(){};

    Router.prototype.configure = function(app) {
        // Get all categories
        app.get('/api/categories', categoryController.getCategories );

        // Get all materials
        app.get('/api/materials', materialController.getMaterials );

        // Get all locations
        app.post('/api/locations', locationController.getLocations );

        app.post('/api/users', userController.getUsers );
    };

    module.exports = new Router();
})();