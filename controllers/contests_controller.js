const axios = require('axios');

module.exports.ongoing = (req, res) => {
    axios.get('https://contesttrackerapi.herokuapp.com')
		.then(response => {
			res.render('contests/ongoing', { ongoing: response.data.result.ongoing });
		})
		.catch(err => console.log(err));
}

module.exports.upcoming = (req, res) => {
    axios.get('https://contesttrackerapi.herokuapp.com')
        .then(response => {
            res.render('contests/upcoming', { upcoming: response.data.result.upcoming });
        })
        .catch(err =>console.log(err));
}