const mongoose = require('mongoose'), Schema = mongoose.Schema;

const postSchema = new Schema({
    _id: Number,
    title : String,
    author: String,
    date: String,
    content: String,
    comments: [
        {
            c_id: Number,
            c_timestamp: String,
            c_author: String,
            c_content: String,
        }
    ]
  })
  
  const Post = module.exports = mongoose.model("Post", postSchema)
  