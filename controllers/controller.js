
var db = require("../models");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render('index', handlebarsObj)
    });


    app.get("/api/fashion", function (req, res) {
        var handlebarsObj = [];
        db.products.findAll({
            where: { department: 'fashion' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('products', handlebarsObj)
    });


    app.get("/api/sports", function (req, res) {

        var handlebarsObj = [];
        db.products.findAll({
            where: { department: 'sports' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('products', handlebarsObj)
    });


    app.get("/api/books", function (req, res) {
        var handlebarsObj = [];
        db.products.findAll({
            where: { department: 'books' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('products', handlebarsObj)
    });


    app.get("/api/cars", function (req, res) {
        var handlebarsObj = [];
        db.products.findAll({
            where: { department: 'cars' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('products', handlebarsObj)
    });


    app.get("/api/electronics", function (req, res) {
        var handlebarsObj = [];
        db.products.findAll({
            where: { department: 'electronics' }
        }).then(function (results) {
            results.forEach(function (item) {
                handlebarsObj.push(item)
            });
        });
        // replace with new handlebars↓
        res.render('products', handlebarsObj)
    });


    app.post("/api/post", function (req, res) {
        db.products.create({
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
            return console.log('Wrong quantity')
        }
        else if (newQuantity = 0) {
            db.products.update(
                { quantity: newQuantity },
                { where: { id: req.body.id } }
            ).then(function (put) {
                res.direct('/api/delete/zero');
            });
        }
        else {
            db.products.update(
                { quantity: newQuantity },
                { where: { id: req.body.id } }
            ).then(function (put) {
                res.json(put)
            });
        };
    });


    app.delete('/api/delete', function (req, res) {
        db.products.destroy({
            where: { id: req.body.id }
        }).then(function (x) {
            res.json(x)
        });
    });


    app.delete('/api/delete/zero', function (req, res) {
        db.products.destroy({
            where: { id: req.body.id }
        }).then(function (x) {
            res.json(x)
        });
    });
};