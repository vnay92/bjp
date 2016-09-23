var request = require('request');
var parser = require('xml2json');

var options = {
    method: 'GET',
    url: 'http://xkcd.com/rss.xml',
    headers: {
        'cache-control': 'no-cache'
    }
};

request(options, function(error, response, body) {
    if (error) throw new Error(error);

    console.log(parser.toJson(body, {
        object: true
    }));
});
