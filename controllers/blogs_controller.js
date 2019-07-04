const {
    upload,
    deleteImg
} = require('../config/imgupload');

module.exports.index = async (req, res) => {
    try {
        let blogs = await Blog.find().sort({ createdAt: 'desc' }).populate('by');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.single = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id).populate('by');
        res.render('blogs/view', { blog });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.myBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find({ by: req.user._id }).sort({ createdAt: 'desc' }).populate('by');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.userBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find({ by: req.params.id }).sort({ createdAt: desc }).populate('by');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.add = (req, res) => {
    res.render('blogs/add', { err: false });
}

module.exports.addProcess = async (req, res) => {
    let { title, description } = req.body;
    if (!title || !description) {
        res.render('blogs/add', { err: true, msg: 'All fields are mandatory!!' });
    }
    if (!req.file.url) {
        res.render('blogs/add', { err: true, msg: 'Please upload an image' });
    }
    else {
        let newBlog = {
            title,
            description,
            by: req.user._id,
            img: {
                id: req.file.public_id,
                url: req.file.url
            }
        }
        try {
            let blog = await Blog.create(newBlog);
            res.render('blogs/view', { blog });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports.update = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (blog.by.toString() == req.user._id.toString()) {
            res.render('blogs/update', { blog });
        }
        else {
            res.redirect('/back');
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.updateProcess = async (req, res) => {
    let { title, description } = req.body;
    if (!title || !description) {
        res.render('blogs/add', { err: true, msg: 'All fields are mandatory!!' });
    }
    try {
        let blog = await Blog.findById(req.params.id);
        await deleteImg(blog.img.id);
        blog.title = title;
        blog.description = description;
        blog.img.id = req.file.public_id;
        blog.img.url = req.file.url;
        await blog.save();
        res.redirect('/blogs/myBlogs');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.Delete = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        let result = await deleteImg(blog.img.id);
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs/myBlogs');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.like = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        blog.likes.forEach(like => {
            if (String(like.user) == String(req.user._id)) {
                res.render('blogs/view', { blog });
            }
        });
        blog.likes.unshift({ user: String(req.user._id) });
        await blog.save();
        res.redirect(`/blogs`);
    }
    catch (err) {
        console.log(err);
    }
}

// module.exports.unlike = async (req, res) => {
//     try {
//         let blog = await Blog.findById(req.params.id);
//         const removeIndex = blog.likes.map(item => item.likeBy.toString()).indexOf(req.user.id);
//         blog.likes.splice(removeIndex, 1);
//         await blog.save();
//         res.redirect('/back');
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

module.exports.comment = async (req, res) => {
    let { comment } = req.body;
    if (!comment) {
        res.redirect('/back');
    }
    else {
        try {
            let blog = await Blog.findById(req.params.id);
            const newComment = {
                comment,
                user: req.user._id,
                name: req.user.name,
                img: req.user.img
            }
            blog.comments.unshift(newComment);
            await blog.save();
            res.redirect(`/blogs`);
        }
        catch (err) {
            console.log(err);
        }
    } 
}

// module.exports.uncomment = async (req, res) => {
//     try {
//         let blog = await Blog.findById(req.params.id);
//         const removeIndex = blog.comments.map(item => item.commentBy.toString).indexOf(req.user.id);
//         blog.likes.splice(removeIndex, 1);
//         await blog.save();
//         res.redirect('/back');
//     }
//     catch (err) {
//         console.log(err);
//     }
// }