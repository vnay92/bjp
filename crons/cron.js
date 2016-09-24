var CronJob = require('cron').CronJob;
var crons = require(__dirname + '/../');

new CronJob('* * * * * *', function() {

}, null, true, 'Asia/Kolkata');
