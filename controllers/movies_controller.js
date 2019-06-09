const axios = require('axios');

const urlPart = process.env.MOVIES_API_URL_PART;

module.exports.index = (req, res) => {
    res.render('movies/index');
}

module.exports.search = async (req, res) => {
    let query = req.body.query;
    let response = await axios.get(`${urlPart}s=${query}`);
    if (response.data.Search.length !== 0) {
        res.render('movies/results', { movies: response.data.Search });
    }
    res.render('movies/results', { msg: 'No results found!!' });
}

module.exports.view = async (req, res) => {
    let id = req.params.id;
    let response = await axios.get(`${urlPart}i=${id}&plot=full`);
    res.render('movies/view', { movie: response.data });
}