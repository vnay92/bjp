// Service that Logs onto a system
// Cound be Mongo, File or Console or anything
// Right now it's only gonna be Console

var Logger = {

    // Log to MongoDB
    mongo: function (data, collection, callback) {
        // not implemented
        callback();
    },

    // Log to the Console
    console: function(data, type, callback) {
        var str = '[' + new Date() + '] [' + type + ']: ' + JSON.stringify(data);
        console.log(str);
        if(callback) {
            callback();
        }
    }
};

module.exports.Logger = Logger;
