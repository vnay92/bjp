var request = require('request');
var parser = require('xml2json');

module.exports.feed = function(url, callback) {
    var options = {
        method: 'GET',
        url: url,
    };

    request(options, function(error, response, body) {
        if (error) {
            // callback(error);
            throw new Error(error);
        }

        callback(parser.toJson(body, {
            object: true
        }));
    });
};
