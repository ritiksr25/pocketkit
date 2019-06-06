const axios =require('axios');

const url = process.env.CONTESTS_API_URL;

module.exports.ongoing = async (req, res) => {
    let response = await axios.get(url);
    res.render('contests/ongoing', { ongoing: response.data.result.ongoing });
}	

module.exports.upcoming = async (req, res) => {
    let response = await axios.get(url);
    res.render('contests/upcoming', { upcoming: response.data.result.upcoming });
}