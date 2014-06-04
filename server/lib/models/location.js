(function() {
    'use strict';

    var mongoose = require('mongoose'),
        Material = require('./material'),
        Category = require('./category'),
        Schema = mongoose.Schema,
        fs = require('fs'),
        path = require('path');

    var loader = function(path, Schema) {
        fs.readFile(path, 'utf8', function(err, data) {
            var locations = JSON.parse(data);
            locations.forEach(function(location) {
                Category.findOne({code: location.category}, function(err, category) {
                    if(err) {console.log(err);}
                    else {
                        location.category = category;
                        Material.find().where('name').in(location.materials).exec(function(err, materials) {
                            location.materials = [];
                            materials.forEach(function(material) {
                                location.materials.push(material);
                            });
                            new Schema(location).save(function(err) {
                                if(err) {
                                    console.log(err);
                                }
                            });
                        });
                    }
                });
            });
        });
    };

    var schema = new Schema({
        name: {type: String, required: true},
        coordinates: {
            type: {
                lng: {type: Number, required: true},
                lat: {type: Number, required: true}
            },
            required: true,
            index: '2d'
        },
        category: {type: Schema.Types.ObjectId, required: true, ref: 'Category'},
        materials: [{type: Schema.Types.ObjectId, required: true, ref: 'Material'}],
        phone: {
            type: {
                number: {type: String},
                extension: {type: String}
            }
        },
        address: {
            type: {
                street: {type: String},
                city: {type: String}
            }
        }
    });

    var Location = mongoose.model('Location', schema);

    Location.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            loader(path.join(__dirname, '../data/location.json'), Location);
        }
    });

    module.exports = Location;
})();