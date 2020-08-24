const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// this will be our data base's data structure 
const ArticleSchema = new Schema(
  {
    id: Number,
    title: String,
    source: String,
    content: String,
    timestamp: String,
    deleted: Boolean
  },
  { timestamps: true }
)
 
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Article', ArticleSchema);