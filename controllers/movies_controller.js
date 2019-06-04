const axios = require('axios');

require('dotenv').config();

const apikey = process.env.OMDB_API_KEY;

module.exports.index = (req, res) => {
    res.render('movies/index');
}

module.exports.search = (req, res) => {
    let query = req.body.query;
    var url = `http://www.omdbapi.com/?s=${query}&apikey=${apikey}`;
    axios.get(url).then(response => {
        res.render('movies/results', { movies: response.data.Search });
    }).catch(err => console.log(err))
}

module.exports.view = (req, res) => {
    let id = req.params.id;
    var url = `http://www.omdbapi.com/?i=${id}&plot=full&apikey=${apikey}`;
    axios.get(url).then(response => {
        res.render('movies/view', { movie: response.data });
    }).catch(err => console.log(err)) 
}