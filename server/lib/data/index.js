(function() {
    'use strict';

     var fs = require('fs');

    module.exports = function(path, Class) {
        fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
            if(err) {
                console.log(err);
            } else {
                JSON.parse(data).forEach(function(datum) {
                    new Class(datum).save();
                });
            }
        });
    };
})();