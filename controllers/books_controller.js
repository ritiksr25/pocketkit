const axios = require('axios');

//load library model
const Library = require('../models/Library');

module.exports.index = (req, res) => {
    res.render('books/index');
}

module.exports.search = (req, res) => {
    var query = req.body.query;
    var url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
    axios.get(url).then(response => {
        res.send(response.data.items);//pagination pending
    })
}

module.exports.library = (req, res) => {
    Library.find({ user: req.user.id }).then(books => {
        res.render('books/library', { books });
    })
}

module.exports.add = (req, res) => {
    const newBook = {

    }
    Library.findOne({ user: req.user.id, id:bookid }).then(book => {
        if(book){
            
        }
        else{
            Library.create(newBook).then(book => {

            })
        }
    })
}

module.exports.delete = (req, res) => {
    Library.deleteOne({ user: req.user.id, id: bookid }).then(book => {

    })
}