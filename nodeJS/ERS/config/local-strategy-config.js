// config/local-strategy-config.js
const passport = require('passport');

module.exports = (passport) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Replace with the route you want to redirect to on successful login
    failureRedirect: '/login', // Replace with the route you want to redirect to on failed login
    failureFlash: true, // Enable flash messages for error handling
  });
};
