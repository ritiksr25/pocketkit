module.exports.login = (req, res) => {
    res.redirect('/');
}

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports.profile = (req, res) => {
    res.render('index/profile');
}

module.exports.admin = async (req, res) => {
    let users = await User.find({}).sort({ createdAt: 'desc' });
    res.render('index/admin', { users });
}