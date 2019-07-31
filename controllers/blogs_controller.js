const { deleteImg } = require('../config/imgupload');
escapeRegex = text => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
module.exports.index = async (req, res) => {
	let query = req.query.search;
	let blogs;
	try {
		if (query) {
			const regex = new RegExp(escapeRegex(query), 'gi');
			blogs = await Blog.find({
				$and: [
					{ published: true },
					{ $or: [{ title: regex }, { description: regex }] }
				]
			})
				.sort({ createdAt: 'desc' })
				.populate('by');
		} else {
			blogs = await Blog.find({ published: true })
				.sort({ createdAt: 'desc' })
				.populate('by')
		}
		// res.json(blogs);
		res.render('blogs/index', { blogs, data: 'All ' });
	} catch (err) {
		console.log(err);
	}
};

module.exports.single = async (req, res) => {
	try {
		let blog = await Blog.findById(req.params.id).populate('by');
		res.render('blogs/view', { blog });
	} catch (err) {
		console.log(err);
	}
};

module.exports.myBlogs = async (req, res) => {
	try {
		let blogs = await Blog.find({ by: req.user._id })
			.sort({ createdAt: 'desc' })
			.populate('by');
		res.render('blogs/index', { blogs, data: 'My ' });
	} catch (err) {
		console.log(err);
	}
};

module.exports.userBlogs = async (req, res) => {
	try {
		let blogs = await Blog.find({ by: req.params.id, published: true })
			.sort({ createdAt: 'desc' })
			.populate('by');
		if (req.params.id == String(req.user._id)) {
			res.redirect('/blogs/myBlogs');
		} else {
			let user = await User.findById(req.params.id);
			res.render('blogs/index', { blogs, data: `${user.name} 's ` });
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.add = (req, res) => {
	res.render('blogs/add', { err: false });
};

module.exports.addProcess = async (req, res) => {
	let { title, description, published } = req.body;
	if (!title || !description) {
		res.render('blogs/add', {
			err: true,
			msg: 'All fields are mandatory!!'
		});
	}
	let img = {};
	let isPublished = true;
	if (!published) {
		isPublished = false;
	}
	if (!req.file) {
		img.id = undefined;
		img.url = undefined;
	} else {
		img.id = req.file.public_id;
		img.url = req.file.url;
	}
	console.log(req.file);
	let newBlog = {
		title,
		description,
		by: req.user._id,
		img,
		published: isPublished
	};
	try {
		let blog = await Blog.create(newBlog);
		res.redirect(`/blogs/view/${String(blog._id)}`);
	} catch (err) {
		console.log(err);
	}
};

module.exports.update = async (req, res) => {
	try {
		let blog = await Blog.findById(req.params.id);
		if (blog.by.toString() == req.user._id.toString()) {
			res.render('blogs/update', { blog });
		} else {
			res.redirect('/back');
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.updateProcess = async (req, res) => {
	let { title, description, published } = req.body;
	if (!title || !description) {
		res.render('blogs/add', {
			err: true,
			msg: 'All fields are mandatory!!'
		});
	}
	let isPublished = true;
	if (!published) {
		isPublished = false;
	}
	try {
		let blog = await Blog.findById(req.params.id);
		let img = {};
		if (!req.file) {
			img.id = blog.img.id;
			img.url = blog.img.url;
		} else {
			await deleteImg(blog.img.id);
			img.id = req.file.public_id;
			img.url = req.file.url;
		}
		blog.title = title;
		blog.description = description;
		blog.img.id = img.id;
		blog.img.url = img.url;
		blog.published = isPublished;
		await blog.save();
		res.redirect(`/blogs/view/${String(blog._id)}`);
	} catch (err) {
		console.log(err);
	}
};

module.exports.Delete = async (req, res) => {
	try {
		let blog = await Blog.findById(req.params.id);
		await deleteImg(blog.img.id);
		await Blog.findByIdAndDelete(req.params.id);
		res.redirect('/blogs/myBlogs');
	} catch (err) {
		console.log(err);
	}
};

module.exports.like = async (req, res) => {
	try {
		let blog = await Blog.findById(req.params.id);
		let liked = 0;
		blog.likes.map(like => {
			if (like.user.indexOf(req.user._id) !== -1) {
				blog.likes.splice(like.user.indexOf(req.user._id), 1);
				liked++;
			}
		});
		if (liked == 0) {
			blog.likes.unshift({ user: String(req.user._id) });
		}
		await blog.save();
		res.redirect(`/blogs/view/${String(req.params.id)}`);
	} catch (err) {
		console.log(err);
	}
};

module.exports.comment = async (req, res) => {
	let { comment } = req.body;
	if (!comment) {
		res.redirect(`/blogs/view/${String(req.params.id)}`);
	} else {
		try {
			let blog = await Blog.findById(req.params.id);
			const newComment = {
				comment,
				user: req.user._id,
				name: req.user.name,
				img: req.user.img
			};
			blog.comments.unshift(newComment);
			await blog.save();
			res.redirect(`/blogs/view/${String(req.params.id)}`);
		} catch (err) {
			console.log(err);
		}
	}
};
