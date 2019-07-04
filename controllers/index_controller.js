module.exports.index = (req, res) => {
    res.render('index/index');
}

module.exports.about = (req, res) => {
    res.render('index/about');
}

module.exports.notauth = (req, res) => {
    res.render('index/notauth');
}

module.exports.notfound = (req, res) => {
    res.render('index/notfound');
}

module.exports.underdev = (req, res) => {
    res.render('index/underdev');
}