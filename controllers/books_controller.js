const axios = require('axios');

const urlpart = process.env.BOOKS_API_URL_PART;
module.exports.index = (req, res) => {
    res.render('books/index');
}

module.exports.search = async (req, res) => {
    const perPage = 10;
    var page = req.query.page;
    var lower = perPage*page-perPage;
    var upper = perPage*page;
    var query = req.body.query;
    var url = `${urlpart}q=${query}&maxResults=40`;
    let response = await axios.get(url);
    var books = response.data.items.slice(lower, upper);
    res.render('books/result', { books });
}

module.exports.library = async (req, res) => {
    let books = await Library.find({ user: req.user.id })
        res.render('books/library', { books });
}

module.exports.add = async (req, res) => {
    var url = `${urlpart}/${req.params.id}`;
    let response = await axios.get(url);
    const newBook = {
        user: req.user.id,
        bookid: response.data.id,
        link: response.data.selfLink,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors,
        publisher:response.data.volumeInfo.publisher,
        thumbnail:response.data.volumeInfo.imageLinks.thumbnail
    }
    let book = await Library.findOne({ user: req.user.id, bookid });
        if(book){
            res.redirect('/back');
        }
        else{
            let book = await Library.create(newBook);
            res.redirect('/books/library');
        }
}

module.exports.delete = async (req, res) => {
    let book = await Library.deleteOne({ user: req.user.id, id: bookid })
    res.redirect('/books/library');
}