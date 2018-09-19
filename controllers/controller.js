var path = require("path");

module.exports = function (app) {
    app.get("/", function (req, res) {
        // orm for aplicable  get route
        res.render('index', handlebarsObj)
    });


    app.get("/api/fashion", function (req, res) {
        // orm for aplicable  get route
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/sports", function (req, res) {
        // orm for aplicable  get route
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/books", function (req, res) {
        // orm for aplicable  get route
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/cars", function (req, res) {
        // orm for aplicable  get route
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/electronics", function (req, res) {
        // orm for aplicable  get route
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });

    app.post("/api/post", function (req, res) {

        // orm for new item

    });

    app.put('/api/buy', function (req, res) {
        // orm for updating productNumber
    });

    app.delete('/api/delete', function(req,res){
        // orm for delete route
    })

}


// sellerform
// buyarea
// Status Codes