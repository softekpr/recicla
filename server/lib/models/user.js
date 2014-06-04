(function() {
    'use strict';

    var mongoose = require('mongoose'),
        path = require('path'),
        fs = require('fs'),
        configuration = require('../configuration/'),
        Schema = mongoose.Schema;

    var schema = new Schema({
        coordinates: {
            type: {
                lng: {type: Number, required: true},
                lat: {type: Number, required: true}
            },
            required: true,
            index: '2d'
        },
        materials: [{type: Schema.Types.ObjectId, required: true, ref: 'Material'}],
        timestamp: {type: Date, required: true, default: Date.now}
    });

    var User = mongoose.model('User', schema);

    module.export = mongoose.model('User', User);
})();