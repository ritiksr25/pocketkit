const axios = require('axios');

module.exports.index = (req, res) => {
    res.render('books/index');
}

module.exports.search = async (req, res) => {
    const perPage = 10;
    var page = req.query.page;
    var lower = perPage*page-perPage;
    var upper = perPage*page;
    var query = req.body.query;
    var url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40`;
    let response = await axios.get(url);
    var books = response.data.items.slice(lower, upper);
    res.render('books/result', { books });
}

module.exports.library = (req, res) => {
    Library.find({ user: req.user.id }).then(books => {
        res.render('books/library', { books });
    })
}

module.exports.add = async (req, res) => {
    var url = `https://www.googleapis.com/books/v1/volumes/${req.params.id}`;
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
    Library.findOne({ user: req.user.id, bookid }).then(book => {
        if(book){
            res.redirect('/back');
        }
        else{
            Library.create(newBook).then(book => {
                res.redirect('/books/library');
            }).catch(err => console.log(err))
        }
    }).catch(err => console.log(err))
}

module.exports.delete = (req, res) => {
    Library.deleteOne({ user: req.user.id, id: bookid }).then(book => {
        res.redirect('/books/library');
    })
}