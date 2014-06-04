(function () {
    'use strict';

    var Location = require('../models/location'),
        User = require('../models/user'),
        Material = require('../models/material');

    var LocationController = function () {
    };

    LocationController.prototype.getLocations = function (req, res) {
        if(!req.body.materials || !req.body.userLocation || !req.body.box) {
            res.send(400,'Bad request');
        }
        Material.find().where('name').in(req.body.materials)
            .exec(function (err, result) {
                new User({coordinates: req.body.userLocation, materials: result})
                    .save(function (err) {
                        if (err) {
                            res.send(500, err);
                        } else {
                            var coordinates = [
                                [req.body.box[0].lat, req.body.box[0].lng],
                                [req.body.box[1].lat, req.body.box[1].lng]
                            ];
                            Location.where({
                                coordinates: {$within: {$box: coordinates}},
                                materials: {$in: result}
                            }).populate('materials category')
                                .exec(function (err, locations) {
                                    if (err) {
                                        res.send(500, err);
                                    } else {
                                        res.json(locations);
                                    }
                                });
                        }
                    });
            });
    };

    module.exports = new LocationController();
})();