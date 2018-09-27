// Packages and modules we need
var db = require("../models");

var bcrypt = require('bcryptjs');

module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        res.render('index');
    });


    app.get("/api/currentUser", function (req, res) {
        res.json(req.user)
    });


    app.get("/api/fashion", function (req, res) {
        db.products.findAll({
            where: { department: 'fashion' }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });

    });


    app.get("/api/sports", function (req, res) {
        db.products.findAll({
            where: { department: 'sports/outdoors' }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });
    });


    app.get("/api/books", function (req, res) {
        db.products.findAll({
            where: { department: 'books' }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });
    });


    app.get("/api/cars", function (req, res) {
        db.products.findAll({
            where: { department: 'cars' }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });
    });


    app.get("/api/electronics", function (req, res) {
        db.products.findAll({
            where: { department: 'electronics' }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });
    });


    app.get("/api/seller/:id", function (req, res) {
        db.products.findAll({
            where: { userid: req.params.id }
        }).then(function (results) {
            res.render('products', { handlebarsObj: results })
        });
    });


    app.get("/api/seller/current", function (req, res) {
        if (!req.user) {
            res.render('nologin')
        }
        else if (req.user) {
            db.products.findAll({
                where: { userid: req.user.id }
            }).then(function (results) {
                res.render('products', { handlebarsObj: results })
            });
        }
    });




    app.get("/seller", function (req, res) {
        if (!req.user) {
            res.render("nologin");
        }
        else if (req.user) {
            res.render('seller')
        }
    });


    app.post("/api/post", function (req, res) {
        db.products.create({
            product_name: req.body.product_name,
            description: req.body.description,
            img_url: req.body.imgURL,
            department: req.body.department,
            price: req.body.price,
            quantity: req.body.quantity,
            userid: req.user.id
        }).then(function (post) {
            res.json(post)
        });
    });


    app.put('/api/buy', function (req, res) {
        var totalBought = parseInt(req.body.totalBought)
        var oldQuantity = parseInt(req.body.oldQuantity)
        var newQuantity = oldQuantity - totalBought;
        // need to change↑ req.body with actually info
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

    app.get("/login", function (req, res) {
        res.render('login');
    });

    // Process the login form
    app.post('/login', passport.authenticate('local', {
        failureRedirect: '/login', // redirect back to the signup page if there is an error
    }), function (req, res) {
        console.log(req.user);
        res.redirect('/');
    });

    // // CHANGE ROUTE
    app.get("/newuser/:first/:username/:password/:phone", function (req, res) {
        var name = req.params.first;
        var user = req.params.username;
        var password = req.params.password;
        var phone = req.params.phone;

        // Encryption
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                // Store hash in your password DB.
                db.users.create({ first_name: name, username: user, password: hash, phone_number: phone }).then(res.redirect("/login"));
            }); // bcrypt.hash
        }); // bcrypt.genSalt
    }); // app.get

    app.get("/api/cart", function (req, res) {
        if (!req.user) {
            res.render("nologin");
        }

        var handlebarsObj = [];
        db.cart.findAll({
            where: { user_id: req.user.id },
            attributes: ["product_id"]
        }).then(function (results) {
            if (!results) res.redirect("/");

            JSON.stringify(results)
            for (var i = 0; i < results.length; i++) {
                handlebarsObj.push(results[i].product_id)
            }

            if (handlebarsObj) {
                searchProduct(handlebarsObj);
            }
        });

        function searchProduct(handlebarsObj) {
            // console.log(handlebarsObj);

            var productsObj = [];

            for (var i = 0; i < handlebarsObj.length; i++) {
                db.products.findAll({
                    where: { id: handlebarsObj[i] }
                }).then(function (results) {
                    if (!results) res.redirect("/");

                    JSON.stringify(results);
                    console.log(JSON.stringify(results));

                    for (var i = 0; i < results.length; i++) {
                        var x = JSON.stringify(results[i]);
                        productsObj.push(JSON.parse(x))
                    }

                    console.log("PRODUCTS " + productsObj);
                    res.render("cart", { productsObj: productsObj });
                })
            }
        }

    }); // app.get

    app.delete("/api/cart/delete", function (req, res) {
        db.cart.destroy({
            where: {
                product_id: req.body.productId,
                user_id: req.user.id
            }
        }).then(function (results) {
            res.redirect('back');
        });
    }); // app.delete

}; // module.exports