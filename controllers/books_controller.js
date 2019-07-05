const axios = require('axios');

const urlpart = process.env.BOOKS_API_URL_PART;

module.exports.index = (req, res) => {
    res.render('books/index', { data: false });
}

module.exports.search = async (req, res) => {
    let page = req.query.page || 1;
    let lower = 10 * page - 10;
    let upper = 10 * page;
    let query = req.body.query;
    if(query) {
        try {
            let response = await axios.get(`${urlpart}q=${query}`);
            if (!response.data.items) {
                res.render('books/index', { data: true, isBooks: false });
            }
            else {
                let books = response.data.items.slice(lower, upper);
                res.render('books/index', { books, data: true, isBooks: true });
            }
    
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        res.redirect('/books');
    }
}

module.exports.library = async (req, res) => {
    try {
        let books = await Library.find({ user: req.user.id });
        res.render('books/library', { books });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.add = async (req, res) => {
    try {
        let response = await axios.get(`${urlpart.split('?')[0]}/${req.params.id}`);
        const newBook = {
            user: req.user.id,
            bookid: req.params.id,
            link: response.data.volumeInfo.infoLink,
            title: response.data.volumeInfo.title,
            author: response.data.volumeInfo.authors[0],
            publisher: response.data.volumeInfo.publisher,
            publishedDate: response.data.volumeInfo.publishedDate,
            thumbnail: response.data.volumeInfo.imageLinks.thumbnail
        }
        let book = await Library.findOne({ user: req.user.id, bookid: req.params.id });
        if (book) {
            res.render('books/library', { msg: 'Book is already in your library!!' })
        }
        else {
            await Library.create(newBook);
            res.redirect('/books/library');
        }
    }
    catch (err) {
        console.log(err);
    }
}

module.exports.Delete = async (req, res) => {
    try {
        await Library.deleteOne({ user: req.user.id, bookid: req.params.id });
        res.redirect('/books/library');
    }
    catch (err) {
        console.log(err);
    }
}