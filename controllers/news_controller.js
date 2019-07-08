const axios = require('axios');

const urlForIndex = process.env.NEWS_API_URL_INDEX;
const urlForSearch = process.env.NEWS_API_URL_PART_SEARCH;

module.exports.index = async (req, res) => {
	try {
		let response = await axios.get(`${urlForIndex}`);
		if (response.data.status === 'ok') {
			res.render('news/index', { news: response.data.articles });
		} else {
			res.render('news/index', { msg: 'Oops!! Something went wrong!' });
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports.search = async (req, res) => {
	let category = req.body.category;
	let query = req.body.query || '';
	try {
		let response = await axios.get(
			`${urlForSearch}category=${category}&q=${query}`
		);
		if (response.data.status === 'ok') {
			res.render('news/index', { news: response.data.articles });
		} else {
			res.render('news/index', { msg: 'Oops! Something went wrong!!' });
		}
	} catch (err) {
		console.log(err);
	}
};
