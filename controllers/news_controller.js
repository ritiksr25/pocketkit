const axios = require('axios');

const urlpre = 'https://hacker-news.firebaseio.com/v0/';
const urlpost = '.json?print=pretty';

async function getEachStory(response){
    let stories = [];
    await response.forEach(async item => {
        let story = await axios.get(`${urlpre}item/${item}${urlpost}`)
            stories.push(story.data);
            // console.log(story.data);
    });
    console.log(stories);
    
}

module.exports.newstories = async (req, res) => {
    let response = await axios.get(`${urlpre}newstories${urlpost}`);
    response.data.length = 10;
    console.log(response.data);
    let stories = await getEachStory(response.data);
     //this line should be executed after foreach loop but is being executed before it.
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