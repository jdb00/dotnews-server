const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// this will be our data base's data structure 
const ArticleSchema = new Schema(
  {
    id: Number,
    title: String,
    author: String,
    source: String,
    category_id: Number,
    content: String,
    timestamp: String,
    photo: String,
  },
  { timestamps: true }
)
 
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Article', ArticleSchema);