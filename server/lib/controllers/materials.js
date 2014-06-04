(function() {
    'use strict';

    var Material = require('../models/material');

    var MaterialController = function(){};

    MaterialController.prototype.getMaterials = function(req, res) {
        Material.find().exec(function(err, materials) {
            if(err) {
                res.send(500, err);
            } else {
                res.json(materials);
            }
        });
    };

    module.exports = new MaterialController();
})();