(function () {
    'use strict';

    var User = require('../models/user'),
        Material = require('../models/material');

    var UserController = function() {};

    UserController.prototype.getUsers = function(req, res) {
        if(!req.query.box) {
            res.send(400);
        }

        var materials = req.query.materials instanceof Array ? req.query.materials : [req.query.materials];

        Material.find().where('name').in(materials)
            .exec(function (err, result) {
                if (err) {
                    res.send(500, err);
                } else {
                    var box = [JSON.parse(req.query.box[0]), JSON.parse(req.query.box[1])];

                    var coordinates = [
                        [box[0].lng, box[0].lat],
                        [box[1].lng, box[1].lat]
                    ];
                    User.find({
                        coordinates: {$within: {$box: coordinates}},
                        materials: {$in: result}
                    }, function (err, users) {
                        if (err) {
                            res.send(500, err);
                        } else {
                            res.json(users);
                        }
                    });
                }

            });
    };

    UserController.prototype.saveUser = function (req, res) {
        if (!req.body.materials || !req.body.userLocation) {
            res.send(400, 'Bad request');
        }
        Material.find().where('name').in(req.body.materials)
            .exec(function (err, result) {
                new User({coordinates: req.body.userLocation, materials: result})
                    .save(function (err) {
                        if (err) {
                            res.send(500, err);
                        } else {
                            res.send(200, 'Saved');
                        }
                    });
            });
    };

    module.exports = new UserController();
})();