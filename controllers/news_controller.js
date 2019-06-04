const axios = require('axios');

const urlpre = 'https://hacker-news.firebaseio.com/v0/';
const urlpost = '.json?print=pretty';

module.exports.newstories = async (req, res) => {
    await axios.get(`${urlpre}newstories${urlpost}`).then(response => {
        response.data.length = 10;
        let stories = [];
        console.log(response.data);
        response.data.forEach(item => {
            axios.get(`${urlpre}item/${item}${urlpost}`).then(story => {
                stories.push(story.data);
                console.log(story.data);
            }).catch(err => console.log(err));
        });
        //res.send(stories);
        //res.render('news/new', { stories });
    }).catch(err => console.log(err));
    console.log(stories); //this line should be executed after foreach loop but is being executed before it.
}

module.exports.topstories = (req, res) => {
    var url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
    var stories = [];
    axios.get(url).then(response => {
        response.data.forEach(item => {
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`).then(story => {
                stories.push(story.data);
            }).catch(err => console.log(err))
        });
        res.render('news/top', { stories });
    }).catch(err => console.log(err))

}

module.exports.beststories = (req, res) => {
    var url = `https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`;
    var stories = [];
    axios.get(url).then(response => {
        response.data.forEach(item => {
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`).then(story => {
                stories.push(story.data);
            }).catch(err => console.log(err))
        });
        res.render('news/best', { stories });
    }).catch(err => console.log(err))
}