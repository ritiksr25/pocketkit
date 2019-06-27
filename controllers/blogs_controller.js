module.exports.index = async (req, res) => {
    try {
        let blogs = await Blog.find({ published: true }).sort({ createdAt: 'desc' }).populate('user');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.single = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id).populate('user');
        res.render('blogs/view', { blog });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.myBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find({ user: req.user.id }).sort({ createdAt: 'desc' }).populate('user');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.userBlogs = async (req, res) => {
    try {
        let blogs = await Blog.find({ user: req.params.id, published: true }).sort({ createdAt: desc }).populate('user');
        res.render('blogs/index', { blogs });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.add = (req, res) => {
    res.render('blogs/add');
}

module.exports.addProcess = async (req, res) => {
    const { title, description, published } = req.body;
    if (!title || !description) {
        res.render('blogs/add', { msg: 'All fields are mandatory!!' });
    }
    else {
        let newBlog = {
            title,
            description,
            published,
            user: req.user.id
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
        if (blog.user == req.user.id) {
            res.render('blogs/update', { blog });
        }
        else {
            res.redirect('/blogs/myBlogs');
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.updateProcess = async (req, res) => {
    const { title, description, published } = req.body;
    if (!title || !description || !published) {
        res.render('blogs/add', { msg: 'All fields are mandatory!!' });
    }
    else {
        try {
            let newBlog = {
                title,
                description,
                published
            }
            let blog = await Blog.findByIdAndUpdate(req.params.id, newBlog);
            if (blog) {
                res.render('blogs/view', { blog });
            }
            else {
                res.redirect('/back');
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports.Delete = async (req, res) => {
    try {
        let blog = await Blog.findOneAndDelete(req.params.id);
        res.redirect('/blogs/myBlogs');

    }
    catch (err) {
        console.log(err);
    }
}

module.exports.like = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        await blog.likes.forEach(like => {
            if (like.user.toString() === req.user.id) {
                res.render('blogs/view', { blog });
            }
        });
        blog.likes.unshift({ user: req.user.id });
        await blog.save();
        res.render('blogs/view', { blog });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.unlike = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        const removeIndex = blog.likes.map(item => item.user.toString()).indexOf(req.user.id);
        blog.likes.splice(removeIndex, 1);
        await blog.save();
        res.render('blogs/view', { blog });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.comment = async (req, res) => {
    const comment = req.body.comment;
    if (!comment) {
        res.redirect('/back');
    }
    else {
        try {
            let blog = await Blog.findById(req.params.id);
            const newComment = {
                comment: comment,
                user: req.user.id,
            }
            blog.unshift(newComment);
            await blog.save();
            res.render('blogs/view', { blog });
        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports.uncomment = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        const removeIndex = blog.comments.map(item => item.user.toString).indexOf(req.user.id);
        blog.likes.splice(removeIndex, 1);
        await blog.save();
        res.render('blogs/view', { blog });
    }
    catch (err) {
        console.log(err);
    }
}