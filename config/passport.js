const passport = require('passport');
const Strategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

require('dotenv').config();

//load user schema
const User = require('../models/User');

module.exports = passport => {
    passport.use(new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/users/login/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleID: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            img: profile.photos[0].value
        }
        User.findOne({ googleID: newUser.googleID }).then(user => {
            if (user) {
                return done(null, user);
            }
            else {
                User.create(newUser).then(user => {
                    return done(null, user);
                })
            }
        })
    }));

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        })
    })
}