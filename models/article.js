const mongoose = require('mongoose')

const Schema = mongoose.Schema

// type validation
const articleSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true}
}, {timestamps: true})

// Storing articles in collection(Article, schema)
const Article = mongoose.model('Article', articleSchema)

module.exports = Article