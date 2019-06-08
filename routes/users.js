const express = require('express');
const passport = require('passport');

const router = express.Router();

//load controller file
const { login, logout } = require('../controllers/user_controller');

//login route
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

//login callback route
router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/notauth' }),
    login)

//logout route
router.get('/logout', logout);

//export router
module.exports = router;

