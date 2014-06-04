(function() {
    'use strict';

    var express = require('express'),
        path = require('path'),
        logging = require(path.join(__dirname, './lib/express/logging')),
        mongoose = require('mongoose'),
        configuration = require(path.join(__dirname, './lib/configuration'));

    mongoose.connect(configuration.get('mongo:uri'));

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

        var Router = require('./lib/router');

        Router.configure(app);

        app.get('*', function(request, response) {
            response.sendfile(path.join(__dirname, '../public/index.html'));
        });
    });

    app.listen(configuration.get('express:port'), function() {
        console.log('Express server listening on port ' + configuration.get('express:port'));
    });

    module.exports = app;
})();