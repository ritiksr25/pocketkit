const axios = require('axios');

const urlForIndex = process.env.NEWS_API_URL_INDEX;
const urlForSearch = process.env.NEWS_API_URL_PART_SEARCH;

module.exports.index = async (req, res) => {
    let page = req.query.page || 1;
    let response = await axios.get(`${urlForIndex}&page=${page}`);
    if (response.data.status === 'ok') {
        res.render('news/index', { news: response.data.articles });
    }
    else {
        res.render('news/index', { msg: 'Oops!! Something went wrong!' });
    }
}

module.exports.search = async (req, res) => {
    let category = req.body.category;
    let q = req.body.q || '';
    let response = await axios.get(`${urlForSearch}category=${category}&q=${q}`);
    if (response.data.status === 'ok') {
        if (response.data.totalResults !== 0) {
            res.render('news/index', { news: response.data.articles });
        }
        else {
            res.render('news/index', { msg: 'No results found!!' });
        }
    }
    else {
        res.render('news/index', { msg: 'Oops! Something went wrong!!' });
    }
}
