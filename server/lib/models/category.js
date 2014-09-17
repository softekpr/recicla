(function() {
    'use strict';

    var mongoose = require('mongoose'),
        path = require('path'),
        loader = require('../data'),
        configuration = require('../configuration'),
        Schema = mongoose.Schema;

    var schema = new Schema({
        code: {type: String, required: true},
        description: {type: String, required:true}
    });

    var Category = mongoose.model('Category', schema);

    if(configuration.get('NODE:ENV') === 'development') {
        Category.remove({}, function(err) {
            if(err) {
                console.log(err);
            } else {
                loader(path.join(__dirname, '../data/category.json'), Category);
            }
        });
    }

    module.exports = Category;
})();