const axios = require('axios');

const urlPart = process.env.MOVIES_API_URL_PART;

module.exports.index = (req, res) => {
	res.render('movies/index', { data: false });
};

module.exports.search = async (req, res) => {
	let query = req.body.query;
	try {
		let response = await axios.get(`${urlPart}s=${query}`);
		if (!response.data.Search) {
			res.render('movies/index', { data: true, isMovies: false });
		} else {
			res.render('movies/index', {
				data: true,
				isMovies: true,
				movies: response.data.Search
			});
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.view = async (req, res) => {
	let id = req.params.id;
	try {
		let response = await axios.get(`${urlPart}i=${id}&plot=full`);
		res.render('movies/view', { movie: response.data });
	} catch (err) {
		console.log(err);
	}
};
