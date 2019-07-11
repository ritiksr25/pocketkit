const axios = require('axios');

const urlPart = process.env.MOVIES_API_URL_PART;

module.exports.index = async (req, res) => {
	let query = req.query.search;
	if (query) {
		try {
			let response = await axios.get(`${urlPart}s=${query}`);
			res.render('movies/index', {
				data: true,
				movies: response.data.Search
			});
		} catch (err) {
			console.log(err);
		}
	} else {
		res.render('movies/index', { data: false });
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
