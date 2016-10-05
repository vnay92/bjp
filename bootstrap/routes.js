// Load dependencies for route handling
var express = require('express');
var bodyParser = require('body-parser');

// Load the logger because logging is important for obvious reasons!
var Logger = require(__dirname + '/../services/logger').Logger;

// Load the Controllers because MVC architecture is cool
var RSS = require(__dirname + '/../controllers/rss').RSS;

module.exports = function(app) {

    // Rendering static files [JS, CSS and stuff]
    app.use(express.static('public'));


    /************************************
     *            MIDDLEWARES           *
     ***********************************/
    // Body parser converts JSON and Form data to object
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    // Custom Middleware to log all request
    app.use('/*', logRequest);


    /*************************************
     *              ROUTES               *
     ************************************/

    app.get('/', function(req, res) {
        res.json({
            status: 'OK',
            message: 'All OK my man!'
        });
    });

    var apiRouter = express();

    // This would have all the routes starting with /api
    // /api would be the core, will be authenticated and should never
    // go down! ever!
    app.use('/api', apiRouter);
    apiRouter.get('/', sendError);

    apiRouter.get('/health', function(req, res) {
        res.json({
            service: 'RSS-BJP API',
            health: 'Running'
        });
        res.end();
    });

    apiRouter.get('/rss/:id', RSS.getFeed);


    /**********************************
     *             VIEWS              *
     *********************************/

    // set the view engine to ejs
    app.set('view engine', 'ejs');
    app.get('/', function(req, res) {
        res.render('main', {
            page: 'index'
        });
    });

    app.get('/:page', function(req, res) {
        console.log(req.params);
        res.render('main', {
            page: req.params.page
        }, function(err, html) {
            // If the page is not found, send the 404 page
            if (err) {
                return res.render('404');
            }
            // render the html
            res.send(html);
        });
    });

};

var sendError = function(req, res) {
    res.status = 401;
    res.json({
        status: 'ERROR',
        message: 'Not allowed to use this route'
    });
    res.end();
};

var logRequest = function(req, res, next) {
    var logData = {
        url: req.originalUrl,
        time: new Date(),
        parameters: req.params,
        body: req.body,
        query_parameters: req.query
    };

    Logger.console(logData, 'REQUEST');
    next();
};
