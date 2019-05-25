module.exports.index = (req, res) => {
    res.send('Hi! Working Properly!! User: ' + req.user.name || '.');
}

module.exports.notauth = (req, res) => {
    res.render('index/notauth');
}