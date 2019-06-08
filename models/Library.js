const mongoose = require('mongoose');

const LibrarySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookid: { type: String, required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    authors: { type: Array, required: true },
    publisher: { type: String, required: true },
    thumbnail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

//export model
module.exports = Library = mongoose.model('Library', LibrarySchema);