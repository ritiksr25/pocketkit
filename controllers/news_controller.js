const request = require('request');


module.exports.newstories = (req, res) => {
    //axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
      //  .then(response => {
           // response.forEach(itemid => {
                axios.get(`https://hacker-news.firebaseio.com/v0/item/160705.json`)
                    .then(item => {
                        var data = JSON.parse(item);
                        res.json(data);
                    })


                
           // });
        //})
}