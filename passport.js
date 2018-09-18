// config/passport.js
				
// load all the things we need
var Strategy   = require('passport-local').Strategy;

var connection = require("./connection");	

var bcrypt = require('bcryptjs');

// expose this function to our app using module.exports
module.exports = function (passport) {
  passport.use(new Strategy(
      function (username, password, cb) {
        connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, results) {
          if(err) {return cb(err)};
          if(results.length === 0) {return cb(err)};

          bcrypt.compare(password, results[0].password, function(err, res) {
            console.log(res);
            let user = results[0];
            if(res === false) {return cb(err)};
            return cb(null, user);
          }); // bcrypt.compare

        }); // connection.query
          
      })); // passport.use

  passport.serializeUser(function (user, cb) {
      cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
      connection.query("SELECT * FROM users where id = ?", [id], function (err, results) {
          let user = results[0];
          if (err) { return cb(err); }
          cb(null, user);
      });
  });

}; // module.exports