var client = require(__dirname + '/../helpers/client');

var channels = {
    // Personals
    github: 'https://github.com/vnay92.private.atom?token=AIHdOLRFVssR8Joovi0khWwtasSzCg-5ks62CekNwA==',

    // Comics
    xkcd: 'http://xkcd.com/rss.xml',
    oglaf: 'http://oglaf.com/feeds/rss/',
    explosm: 'http://feeds.feedburner.com/Explosm',
    channelate: 'http://feeds2.feedburner.com/channelATE',
    questionable: 'http://www.questionablecontent.net/QCRSS.xml',

    // Science and Technology
    cnet: 'http://www.cnet.com/rss/news/',
    apple: 'http://www.theverge.com/apple/rss/index.xml',
    google: 'http://www.theverge.com/google/rss/index.xml',
    android: 'http://feeds.feedburner.com/AndroidPolice?format=xml',
    abc_tech: 'http://feeds.abcnews.com/abcnews/technologyheadlines',
    indian_express_tech: 'http://indianexpress.com/section/technology/feed/',

    // General News
    google_news: 'https://news.google.co.in/?output=rss',
    toi: 'http://timesofindia.indiatimes.com/rssfeedstopstories.cms',
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
