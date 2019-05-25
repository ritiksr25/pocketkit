const axios = require('axios');

module.exports.index = (req, res) => {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=nodejs')
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err))
}