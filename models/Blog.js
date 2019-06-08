const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    //   img: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: { type: String, required: true },
        email: { type: String, required: true },
        img: { type: String, required: true },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    published: { type: Boolean, default: true }
})

//export model
module.exports = Blog = mongoose.model('Blog', BlogSchema);