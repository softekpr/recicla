(function() {
    'use strict';

    var Category = require('../models/category');

    var CategoryController = function(){};

    CategoryController.prototype.getCategories = function(req, res) {
        Category.find().exec(function(err, categories) {
            if(err) {
                res.send(500, err);
            } else {
                res.json(categories);
            }
        });
    };

    module.exports = new CategoryController();
})();