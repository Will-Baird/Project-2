// Require npm packages
var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var connection = require("./connection");
var passport = require("passport");
var session = require('express-session');
var bcrypt = require('bcryptjs');

require("./passport.js")(passport);

var app = express();

//CREATE STATIC VERSION OF YOUR ASSETS FOLDER FOR EXPRESS HTTP SERVER TO ACCESS
app.use(express.static('public'));

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }));


app.use(passport.initialize());
app.use(passport.session());


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/test", function (req, res) {
    console.log(req.user);
    res.sendFile(path.join(__dirname, "./test.html"));
});

// process the login form
app.post('/login', passport.authenticate('local', { // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        }), function(req, res) {
            console.log(req.user);
            res.redirect('/test');
        });

app.get("/newuser/:username/:password", function(req,res) {
    console.log(req.params);
    var password = req.params.password;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            console.log(password);
            // Store hash in your password DB.
            connection.query("INSERT INTO users (username, password) VALUES (?,?)", [req.params.username, hash], function(err, results) {
                if(err) console.log(err);
                console.log(results);
            });
        });
    });
    res.redirect("/");
});

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});