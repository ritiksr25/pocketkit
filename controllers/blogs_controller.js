module.exports.index = (req, res) => {
    Blog.find({ published: true }).sort({ createdAt: desc }).then(blogs => {
        res.render('blogs/index',{ blogs });
    }).catch(err => console.log(err))
}

module.exports.single = (req, res) => {
    Blog.findOne({ _id: req.params.id }).then(blog => {
        res.render('blogs/view', { blog });
    }).catch(err => console.log(err));
}

module.exports.myBlogs = (req, res) => {
    Blog.find({ user: req.user.id }).sort({ createdAt: desc }).then(blogs => {
        res.render('blogs/index', { blogs });
    }).catch(err => {console.log(err)})
}

module.exports.userBlogs = (req, res) => {
    Blog.find({ user: req.params.id, published: true }).sort({ createdAt: desc }).then(blogs => {
        res.render('blogs/index', { blogs });
    }).catch(err => console.log(err))
}

module.exports.add = (req, res) => {
    res.render('blogs/add');
}

module.exports.addProcess = (req, res) => {
    const { title, description, published } = req.body;
    if(!title || !description || !status){
        res.redirect('/blogs/add');
    }
    Blog.create({ title, description, status, published }).then(blog => {
        res.render('blogs/view', { blog });
    }).catch(err => console.log(err))
}

module.exports.update = (req, res) => {
    Blog.findOne({ _id: req.params.id, user: req.user.id }).then(blog => {
        if(blog){
            res.render('blogs/update', { blog });
        }
        else{
            res.redirect('/blogs/myBlogs');
        }
    }).catch(err => console.log(err))
}

module.exports.updateProcess = (req, res) => {
    const { title, description, status, published } = req.body;
    if(!title || !description || !status){
        res.redirect('/back');
    }
    Blog.findOne({ id: req.params.id }).then(blog => {
        blog.title = title;
        blog.description = description;
        blog.published = published;
        blog.user = req.user.id;
        blog.save().then(blog => {
            res.render('blogs/view', { blog });
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

module.exports.delete = (req, res) => {
    Blog.findOne({ id: req.params.id, user: req.user.id }).then(blog => {
        if(blog){
            Blog.deleteOne({ id: req.params.id }).then(blog => {
                res.redirect('/blogs/myBlogs');
            }).catch(err => console.log(err))
        }
        else{
            res.redirect('/blogs/myBlogs');
        }
    }).catch(err => console.log(err))
}

module.exports.like = (req, res) => {
    Blog.findOne({ id: req.params.id }).then(blog => {
        blog.likes.forEach(like => {
            if(like.user.toString() === req.user.id){
                res.render('blogs/view', { blog });
            }
        });
        blog.likes.unshift({ user: req.user.id });
        blog.save().then(blog => {
            res.render('blogs/view', { blog });
        }).catch(err => console.log(err))
    }).catch(console.log(err))
}

module.exports.unlike = (req, res) => {
    Blog.findOne({ id: req.params.id }).then(blog => {
        const removeIndex = blog.likes.map(item => item.user.toString()).indexOf(req.user.id);
        blog.likes.splice(removeIndex, 1);
        blog.save().then(blog => {
            res.render('blogs/view', { blog });
        }).catch(err => console.log(err))
    }).catch(err => console.log(err))
}

module.exports.comment = (req, res) => {
    const comment = req.body.comment;
    if(!comment){
        res.redirect('/back');
    }
    Blog.findOne({ id: req.params.id }).then(blog => {
        const newComment = {
            comment: comment,
            user: req.user.id,
            name: req.user.name,
            email: req.user.email,
            img: req.user.img
        }
        blog.unshift(newComment);
        blog.save().then(blog => {
            res.render('blogs/view', { blog });
        }).catch(err => console.log(err))
    }).catch(err => onmouseleave.log(err))
}

// module.exports.uncomment = (req, res) => {
//     Blog.findOne({ id: req.params.id }).then(blog => {
//         const removeIndex = blog.comments.map(item => item.user.toString).indexOf(req.user.id);
//         blog.likes.splice(removeIndex, 1);
//         blog.save().then(blog => {
//             res.render('blogs/view', { blog });
//         }).catch(err => console.log(err))
//     }).catch(err => console.log(err))
// }