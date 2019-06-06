const axios =require('axios');

const urlpre = process.env.MOVIES_API_URL_PRE;
const urlpost = process.env.MOVIES_API_URL_POST;

module.exports.index = (req, res) => {
    res.render('movies/index');
}

module.exports.search = async (req, res) => {
    let query = req.body.query;
    var url = `${urlpre}s=${query}${urlpost}`;
    let response = await axios.get(url);
    res.render('movies/results', { movies: response.data.Search });
}

module.exports.view = async (req, res) => {
    let id = req.params.id;
    var url = `${urlpre}i=${id}&plot=full${urlpost}`;
    let response = await axios.get(url);
    res.render('movies/view', { movie: response.data });
}