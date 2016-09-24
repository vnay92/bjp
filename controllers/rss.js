var client = require(__dirname + '/../helpers/client');

var channels = {
    xkcd: 'http://xkcd.com/rss.xml',
    google: 'http://www.theverge.com/google/rss/index.xml',
    apple: 'http://www.theverge.com/apple/rss/index.xml',
    toi: 'http://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    toi_tech: 'http://timesofindia.indiatimes.com/rssfeeds/5880659.cms',
    indian_express: 'http://indianexpress.com/section/technology/feed/',
    cnet: 'http://www.cnet.com/rss/news/',
    abc_tech: 'http://feeds.abcnews.com/abcnews/technologyheadlines',
    google_news: 'https://news.google.co.in/?output=rss',
};

module.exports.RSS = {
    getFeed: function(req, res) {
        channel = channels[req.params.id];
        client.feed(channel, function(data) {
            res.json(data);
            res.end();
        });
    }
};