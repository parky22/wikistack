'use strict';
var express = require('express');
var app = express();
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var routes = require('./routes/wiki.js');
var models = require('./models');
var fs = require('fs');
var bodyParser = require('body-parser');


// templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// logging middleware
app.use(morgan('dev'));
// app.use(morgan(chalk.blue(':method') + chalk.red(' :url') + chalk.green(' :status')));

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

// sync the tables
models.User.sync()
.then(function () {
    return models.Page.sync({force: true})
})
.then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

// modular routing that uses io inside it
app.get('/',function(req, res, next){
    res.send("Homepage");
});
app.use('/wiki', routes);
