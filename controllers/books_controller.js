const axios = require('axios');

const urlpart = process.env.BOOKS_API_URL_PART;

module.exports.index = (req, res) => {
    res.render('books/index');
}

module.exports.search = async (req, res) => {
    let page = req.query.page || 1;
    let lower = 10 * page - 10;
    let upper = 10 * page;
    let query = req.body.query;
    let response = await axios.get(`${urlpart}q=${query}`);
    if (response.data.totalItems !== 0) {
        let books = response.data.items.slice(lower, upper);
        res.render('books/result', { books });
    }
    else {
        res.render('books/results', { msg: 'No results found!!' });
    }

}

module.exports.library = async (req, res) => {
    let books = await Library.find({ user: req.user.id })
    res.render('books/library', { books });
}

module.exports.add = async (req, res) => {
    let response = await axios.get(`${urlpart.split('?')[0]}/${req.params.id}`);
    const newBook = {
        user: req.user.id,
        bookid: response.data.id,
        link: response.data.selfLink,
        title: response.data.volumeInfo.title,
        authors: response.data.volumeInfo.authors,
        publisher: response.data.volumeInfo.publisher,
        thumbnail: response.data.volumeInfo.imageLinks.thumbnail
    }
    let book = await Library.findOne({ user: req.user.id, bookid });
    if (book) {
        res.redirect('/back');
    }
    else {
        let book = await Library.create(newBook);
        res.redirect('/books/library');
    }
}

module.exports.delete = async (req, res) => {
    let book = await Library.deleteOne({ user: req.user.id, id: bookid })
    res.redirect('/books/library');
}