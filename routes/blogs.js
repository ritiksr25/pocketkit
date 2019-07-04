const express = require('express');
const router = express.Router();

//load authcheck
const isLoggedIn = require('../config/authcheck');
//load controller
const {
    index,
    single,
    myBlogs,
    userBlogs,
    add,
    addProcess,
    update,
    updateProcess,
    Delete,
    like,
    comment
} = require('../controllers/blogs_controller');

// img upload
const {
    upload
} = require('../config/imgupload');

//index route -view all user blogs
router.get('/', isLoggedIn, index);
//view single blog
router.get('/view/:id', isLoggedIn, single);
//user blogs
router.get('/myBlogs', isLoggedIn, myBlogs);
router.get('/user/:id', userBlogs);
//add blog
router.get('/add', isLoggedIn, add);
router.post('/add', isLoggedIn, upload.single('file'), addProcess);
//update blog
router.get('/update/:id', isLoggedIn, update);
router.post('/update/:id', isLoggedIn, upload.single('file'), updateProcess);
//delete blog
router.get('/delete/:id', isLoggedIn, Delete);
//like blog route
router.get('/like/:id', isLoggedIn, like);
//comments
router.post('/comment/:id', isLoggedIn, comment);

//export router
module.exports = router;