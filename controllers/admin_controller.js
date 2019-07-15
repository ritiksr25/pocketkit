escapeRegex = text => {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

module.exports.admin = async (req, res) => {
	let query = req.query.search;
	let users;
	try {
		if (query) {
			const regex = new RegExp(escapeRegex(query), 'gi');
			users = await User.find({ $or: [{ name: regex }, { email: regex }] })
				.sort({ createdAt: 'desc' });
		} else {
			users = await User.find({}).sort({ createdAt: 'desc' });
		}
		res.render('index/admin', { users });
	} catch (err) {
		console.log(err);
	}
};

module.exports.deleteUser = async (req, res) => {
	let id = req.params.id;
	let user = await User.findByIdAndDelete(id);
	// delete library
	let lib = await Library.deleteMany({ user: id });
	// delete blogs
	let blogs = await Blog.deleteMany({ by: id });
    res.redirect('/admin');
}