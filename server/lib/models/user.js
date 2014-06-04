(function() {
    'use strict';

    var mongoose = require('mongoose'),
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
        timestamp: {type: Date, default: Date.now}
    });

    var User = mongoose.model('User', schema);

    User.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
    });

    module.exports = User;
})();