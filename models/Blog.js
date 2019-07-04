const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
        name: { type: String },
        img: { type: String },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    published: { type: Boolean, default: true }
}, { timestamps: true })

//export model
module.exports = Blog = mongoose.model('Blog', BlogSchema);