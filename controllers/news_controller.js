const axios = require('axios');

const urlpre = process.env.NEWS_API_URL_PRE;
const urlpost = process.env.NEWS_API_URL_POST;

async function getAllStories(response){
    let stories = [];
    await response.forEach(async item => {
        let story = await axios.get(`${urlpre}item/${item}${urlpost}`)
            stories.push(story.data);
    }); 
    return stories;   
}

module.exports.newstories = async (req, res) => {
    let response = await axios.get(`${urlpre}newstories${urlpost}`);
    let stories = await getAllStories(response.data);
    res.send(stories);
}

// module.exports.topstories = (req, res) => {
//     var url = `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`;
//     var stories = [];
//     axios.get(url).then(response => {
//         response.data.forEach(item => {
//             axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`).then(story => {
//                 stories.push(story.data);
//             }).catch(err => console.log(err))
//         });
//         res.render('news/top', { stories });
//     }).catch(err => console.log(err))

// }

// module.exports.beststories = (req, res) => {
//     var url = `https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`;
//     var stories = [];
//     axios.get(url).then(response => {
//         response.data.forEach(item => {
//             axios.get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`).then(story => {
//                 stories.push(story.data);
//             }).catch(err => console.log(err))
//         });
//         res.render('news/best', { stories });
//     }).catch(err => console.log(err))
// }