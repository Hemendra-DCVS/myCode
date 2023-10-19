const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Employee = require('../models/Employee'); // Adjust the path as needed

passport.use(
  new LocalStrategy((username, password, done) => {
    Employee.findOne({ username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect username.' });
      if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Employee.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = (app) => {
  // Initialize Passport and set up its configuration
  app.use(passport.initialize());
  app.use(passport.session());

  // Your Passport routes configuration
};
