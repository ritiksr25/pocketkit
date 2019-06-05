const axios = require('axios');

const url = 'https://contesttrackerapi.herokuapp.com';

module.exports.ongoing = (req, res) => {
    axios.get(url).then(response => {
			res.render('contests/ongoing', { ongoing: response.data.result.ongoing });
		}).catch(err => console.log(err));
}

module.exports.upcoming = (req, res) => {
    axios.get(url).then(response => {
            res.render('contests/upcoming', { upcoming: response.data.result.upcoming });
        }).catch(err =>console.log(err));
}