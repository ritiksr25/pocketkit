const axios = require('axios');

const urlForIndex = process.env.NEWS_API_URL_INDEX;
const urlForSearch = process.env.NEWS_API_URL_PART_SEARCH;

module.exports.index = async (req, res) => {
	let category = req.query.category;
	let query = req.query.search || '';
	let response;
	try {
		if (category) {
			response = await axios.get(
				`${urlForSearch}category=${category}&q=${query}`
			);
		} else {
			response = await axios.get(`${urlForIndex}`);
		}
		res.render('news/index', { news: response.data.articles });
	} catch (err) {
		console.log(err);
	}
};
