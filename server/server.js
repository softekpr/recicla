(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        fs = require('fs'),
        logging = require(path.join(__dirname, './lib/express/logging')),
        mongoose = require('mongoose'),
        configuration = require(path.join(__dirname, './lib/configuration'));

    // Declare all the modules for Rest....
    var categoryController = require('./lib/controllers/categories.js');
    var materialController = require('./lib/controllers/materials.js');
    var locationController = require('./lib/controllers/locations.js');
    var userController = require('./lib/controllers/users.js');

    mongoose.connect(configuration.get('mongo:uri'));

    var modelsPath = path.join(__dirname, './lib/models');

    fs.readdirSync(modelsPath).forEach(function(file) {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
            require(modelsPath + '/' + file);
        }
    });

    var app = express();

    //this is needed only on dev environment
    //also avoid hard coding the value
    app.use(require('connect-livereload')({
        port: configuration.get('livereload:port')
    }));

    app.configure(function() {
        app.use(express.static(path.join(__dirname, '../build')));
        app.use(express.static(path.join(__dirname, '../public')));
        app.use(express.bodyParser());
        logging(app);

        // Get all categories
        app.get('/api/categories', categoryController.getCategories );

        // Get all materials
        app.get('/api/materials', materialController.getMaterials );

        // Get all locations
        app.post('/api/locations', locationController.getLocations );

        app.post('/api/users', userController.getUsers );

        app.get('*', function(request, response) {
            response.sendfile(path.join(__dirname, '../public/index.html'));
        });
    });

    app.listen(configuration.get('express:port'), function() {
        console.log('Express server listening on port ' + configuration.get('express:port'));
    });

    module.exports = app;
})();