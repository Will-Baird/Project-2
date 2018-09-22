// Require npm packages
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require("./models");
var passport = require("passport");
var session = require('express-session');
var routes = require("./controllers/controller.js");
var exphbs  = require('express-handlebars');

require("./config/passport.js")(passport);

var app = express();

//CREATE STATIC VERSION OF YOUR ASSETS FOLDER FOR EXPRESS HTTP SERVER TO ACCESS
app.use(express.static('public'));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});