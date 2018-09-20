
var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('index', handlebarsObj)
    });


    app.get("/api/fashion", function (req, res) {
        var handlebarsObj = [];
        db.holder.findAll({
            where: { department: 'fashion' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/sports", function (req, res) {

        var handlebarsObj = [];
        db.holder.findAll({
            where: { department: 'sports' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/books", function (req, res) {
        var handlebarsObj = [];
        db.holder.findAll({
            where: { department: 'books' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/cars", function (req, res) {
        var handlebarsObj = [];
        db.holder.findAll({
            where: { department: 'cars' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.get("/api/electronics", function (req, res) {
        var handlebarsObj = [];
        db.holder.findAll({
            where: { department: 'electronics' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('searchResults', handlebarsObj)
    });


    app.post("/api/post", function (req, res) {
        db.holder.create({
            product_name: req.body.product_name,
            description: req.body.description,
            img_url: req.body.url,
            department: req.body.department,
            price: req.body.price,
            quantity: req.body.quantity
        }).then(function (post) {
            res.json(post)
        });
    });


    app.put('/api/buy', function (req, res) {
        var totalBought = parseInt(req.body.totalBought)
        var oldQuantity = parseInt(req.body.oldQuantity)
        var newQuantity = oldQuantity - totalBought;
        // need to put change↑ req.body
        if (newQuantity < 0) {
            // error message
        }
        else {
            db.holder.update(
                { quantity: newQuantity },
                { where: { id: req.body.id } }
            ).then(function (put) {
                res.json(put)
            });
        };
    });

    
    app.delete('/api/delete', function (req, res) {
        db.holder.destroy({
            where: { id: req.body.id }
        }).then(function (x) {
            res.json(x)
        });
    });
};