module.exports.index = async (req, res) => {
    let blogs = await Blog.find({ published: true }).sort({ createdAt: desc });
    res.render('blogs/index', { blogs });
}

module.exports.single = async (req, res) => {
    let blog = await Blog.findOne({ _id: req.params.id });
    res.render('blogs/view', { blog });
}

module.exports.myBlogs = async (req, res) => {
    let blogs = await Blog.find({ user: req.user.id }).sort({ createdAt: desc });
    res.render('blogs/index', { blogs });
}

module.exports.userBlogs = async (req, res) => {
    let blogs = await Blog.find({ user: req.params.id, published: true }).sort({ createdAt: desc });
    res.render('blogs/index', { blogs });
}

module.exports.add = (req, res) => {
    res.render('blogs/add');
}

module.exports.addProcess = async (req, res) => {
    const { title, description, published } = req.body;
    if (!title || !description || !status) {
        res.redirect('/blogs/add');
    }
    let blog = await Blog.create({ title, description, status, published });
    res.render('blogs/view', { blog });
}

module.exports.update = async (req, res) => {
    let blog = await Blog.findOne({ _id: req.params.id, user: req.user.id });
    if (blog) {
        res.render('blogs/update', { blog });
    }
    else {
        res.redirect('/blogs/myBlogs');
    }
}

module.exports.updateProcess = async (req, res) => {
    const { title, description, status, published } = req.body;
    if (!title || !description || !status) {
        res.redirect('/back');
    }
    let blog = await Blog.findOne({ id: req.params.id });
    blog.title = title;
    blog.description = description;
    blog.published = published;
    blog.user = req.user.id;
    let blog1 = await blog.save();
    res.render('blogs/view', { blog: blog1 });
}

module.exports.delete = async (req, res) => {
    let blog = await Blog.findOne({ id: req.params.id, user: req.user.id });
    if (blog) {
        await Blog.deleteOne({ id: req.params.id });
        res.redirect('/blogs/myBlogs');
    }
    else {
        res.redirect('/blogs/myBlogs');
    }
}

module.exports.like = async (req, res) => {
    let blog = await Blog.findOne({ id: req.params.id });
    await blog.likes.forEach(like => {
        if (like.user.toString() === req.user.id) {
            res.render('blogs/view', { blog });
        }
    });
    blog.likes.unshift({ user: req.user.id });
    let blog1 = await blog.save()
    res.render('blogs/view', { blog: blog1 });
}

module.exports.unlike = async (req, res) => {
    let blog = await Blog.findOne({ id: req.params.id });
    const removeIndex = blog.likes.map(item => item.user.toString()).indexOf(req.user.id);
    blog.likes.splice(removeIndex, 1);
    let blog1 = await blog.save();
    res.render('blogs/view', { blog: blog1 });
}

module.exports.comment = async (req, res) => {
    const comment = req.body.comment;
    if (!comment) {
        res.redirect('/back');
    }
    let blog = await Blog.findOne({ id: req.params.id })
    const newComment = {
        comment: comment,
        user: req.user.id,
        name: req.user.name,
        email: req.user.email,
        img: req.user.img
    }
    blog.unshift(newComment);
    let blog1 = await blog.save();
    res.render('blogs/view', { blog: blog1 });
}

module.exports.uncomment = async (req, res) => {
    let blog = await Blog.findOne({ id: req.params.id });
    const removeIndex = blog.comments.map(item => item.user.toString).indexOf(req.user.id);
    blog.likes.splice(removeIndex, 1);
    let blog1 = await blog.save();
    res.render('blogs/view', { blog: blog1 });
}