const express = require('express');
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const LocalStrategy = require('passport-local').Strategy;

// Passport strategy for login
passport.use(
  new LocalStrategy((username, password, done) => {
    Employee.findOne({ username })
      .then((user) => {
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  })
);
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.session.user = user;
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

// Handle registration form submission
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  Employee.findOne({ username })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).send('Username already exists');
      }

      const newUser = new Employee({ username, password });

      newUser.save()
        .then(() => {
          return res.redirect('/login');
        })
        .catch((err) => {
          return res.status(500).send('Internal Server Error');
        });
    })
    .catch((err) => {
      return res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
