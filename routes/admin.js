const express = require('express');
const router = express.Router();

//load controllers
const { admin, deleteUser } = require('../controllers/admin_controller');

const { adminAuth } = require('../config/authcheck');

// admin route
router.get('/', adminAuth, admin);
// admin delete user route
router.get('/delete/:id', adminAuth, deleteUser);

//export router
module.exports = router;