// Require npm packages
var express = require("express");
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require("./models");
var passport = require("passport");
var session = require('express-session');
var routes = require("./controllers/controller.js");
var exphbs  = require('express-handlebars');

var app = express();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


require("./config/passport.js")(passport);


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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

routes(app, passport);

// db.sequelize.sync().then(function () {
//     app.listen(PORT, function () {
//         console.log("App listening on PORT " + PORT);
//     });
// });
// db.sequelize.sync({ force: true }).then(function () {
//     db.products.create({product_name:"Basketball", description:"Shoot like Curry with this.", img_url:"https://images.unsplash.com/photo-1519861531473-9200262188bf?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a44a68952e2d3392a3c1e1b366650a11&auto=format&fit=crop&w=1951&q=80", department:"Sports", price:25.00, quantity:20});
//     db.cart.create({product_id: 1, user_id: 1, quantity: 2})
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});