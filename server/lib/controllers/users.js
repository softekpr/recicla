(function() {
    'use strict';

    var User = require('../models/user'),
        Material = require('../models/material');

    var UserController = function() {};

    UserController.prototype.getUsers = function(req, res) {
        if(!req.body.box) {
            res.send(400);
        }

        Material.find().where('name').in(req.body.materials)
            .exec(function (err, result) {
                if (err) {
                    res.send(500, err);
                } else {
                    var coordinates = [
                        [req.body.box[0].lng, req.body.box[0].lat],
                        [req.body.box[1].lng, req.body.box[1].lat]
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

    module.exports = new UserController();
})();