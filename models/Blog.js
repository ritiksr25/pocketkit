const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: {
        id: { type: String, required: true },
        url: { type: String, required: true }
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        user: { type: String }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        name: { type: String },
        img: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
}, { timestamps: true })

//export model
module.exports = Blog = mongoose.model('Blog', BlogSchema);