// load all the things we need
var Strategy   = require('passport-local').Strategy;

// var connection = require("./connection");	
var db = require("../models");

var bcrypt = require('bcryptjs');

// expose this function to our app using module.exports
module.exports = function (passport) {
  passport.use(new Strategy(
      function (username, password, cb) {
        db.users.findAll({where: {username: username}}).then(function(users) {
          // if(err) {return cb(err)};
          // if(results.length === 0) {return cb(err)};
          if(!users[0]) {return cb()};

          bcrypt.compare(password, users[0].dataValues.password, function(err, res) {
            let user = users[0].dataValues;
            // If the password is incorrect
            if(res === false) {return cb(err)};

            return cb(null, user);
          }); // bcrypt.compare
        }); // .then function          
      })); // passport.use

  passport.serializeUser(function (user, cb) {
      cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    db.users.findAll({where: {id: id}}).then(function(users) {
        let user = users[0].dataValues;
        cb(null, user);
    });
  }); // passport.deserializeUser

}; // module.exports