(function() {
    'use strict';

    var mongoose = require('mongoose'),
        path = require('path'),
        loader = require('../data'),
        Schema = mongoose.Schema;

    var schema = new Schema({
        name: {type: String, required: true},
        cssClass: {type: String, required:true}
    });

    var Material = mongoose.model('Material', schema);

    Material.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else {
            loader(path.join(__dirname, '../data/materials.json'), Material);
        }
    });

    module.exports = Material;
})();