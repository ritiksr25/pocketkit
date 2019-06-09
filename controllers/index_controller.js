module.exports.index = (req, res) => {
    res.render('index/index');
}

module.exports.notauth = (req, res) => {
    res.render('index/notauth');
}

module.exports.notfound = (req, res) => {
    res.render('index/notfound');
}