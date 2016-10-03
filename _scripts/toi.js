var crypto = require('crypto');
var client = require(__dirname + '/../helpers/client');
var toi = 'http://timesofindia.indiatimes.com/rssfeedstopstories.cms';

var transform = function(item) {

    // Create a key for the data to be stored
    var hash = crypto
        .createHash('md5')
        .update(JSON.stringify(item))
        .digest("hex");

    return {
        hash: hash,
        channel: 'TOI',
        image: null,
        title: item.title,
        description: item.description,
        link: item.link,
    };
};

client.feed(toi, function(data) {
    var feeds = data.rss.channel.item;
    for (var i = 0; i < feeds.length; i++) {
        transformed_data = transform(feeds[i]);
        console.log(transformed_data);
    }
});
