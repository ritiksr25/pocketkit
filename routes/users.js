const express = require('express');
const passport = require('passport');

const router = express.Router();

//load authcheck
const { isLoggedIn } = require('../config/authcheck');
//load controller file
const { login, logout, profile } = require('../controllers/user_controller');

//login route
router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));
//login callback route
router.get('/login/callback', passport.authenticate('google', { failureRedirect: '/notauth' }),
    login)
//logout route
router.get('/logout', isLoggedIn, logout);
// profile
router.get('/profile', isLoggedIn, profile);

//export router
module.exports = router;

