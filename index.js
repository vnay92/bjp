// The main File that Runs
var express = require('express');

var env = require(__dirname + '/env').env;
var app = express();

// Logging is important bruh!
var Logger = require(__dirname + '/services/logger').Logger;

/**
 * Routes for the Application
 * The Routes will be simple (hopefully).
 */
require('./bootstrap/routes')(app);

var server = app.listen(env.listen_port, function() {
    console.log('RSS-BJP listening on port ' + env.listen_port + '!');
});

var handleErrors = function(error) {
    server.close(function() {
        var logData = {
            error_message: error.message,
            error_stack: error.stack
        };

        // TODO log to Mongo or something
        Logger.console(logData, 'APP_ERRORS', function(err, status) {
            // process.exit(1);
        });
    });
};

// Universal Exception handling
process.on('uncaughtException', handleErrors);
process.on('Error', handleErrors);
