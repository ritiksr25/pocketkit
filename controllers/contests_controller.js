const axios = require('axios');

const url = process.env.CONTESTS_API_URL;

module.exports.index = async (req, res) => {
    try {
        let response = await axios.get(url);
        res.render('contests/index', {
            ongoing: response.data.result.ongoing,
            upcoming: response.data.result.upcoming
        });
    }
    catch (err) {
        console.log(err);
    }
}