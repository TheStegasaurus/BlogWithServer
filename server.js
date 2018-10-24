const express = require('express');
const path = require('path');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const app = express();
const port = process.env.PORT || 5000;

//Define data format/schema that posts will be stored in the database
const postSchema = new Schema({
  title : String,
  author: String,
  date: String,
  content: String,
  comments: [
      {
          c_id: Number,
          c_timestamp: String,
          c_author: String,
          c_content: String
      }
  ]
})

const Post = module.exports = mongoose.model("Post", postSchema)

// Set up mongoose connection
let dev_db_url = 'mongodb://user:password123@ds029486.mlab.com:29486/blog-db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// API calls

//Get all data
app.get('/api/getData', (req, res) => {  
  //retrieve all posts from database in collection posts
  db.collection("posts").find({}, async (err, docs)=>{
    if (err) console.log(err);
    else{
      //docs is a Cursor, toArray returns a Promise so must wait on that
      let allposts = await docs.toArray();
      res.send({ express: {"posts": allposts}});
    } 
  })  
});

//Post a comment on a particular post
app.post('/api/submitComment', (req, res) => {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    console.log(body);
    let json = JSON.parse(body);

    let today = new Date();

    let comment = {
      c_id: json.c_id,
      c_timestamp: today.toLocaleDateString("en-US"),
      c_author: json.user,
      c_content: json.content
    }

    if(json.content.length > 0){
      Post.update({_id : json.pid}, {$push: { comments:comment }}, {upsert: true}, (err) => {console.log(err)})
    }
    
    res.end('ok');
  });

  return res.json()

});


//Submit a post from a particular user
app.post('/api/submitPost', (req, res) => {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
  });
  req.on('end', () => {
    console.log(body);
    let json = JSON.parse(body);
    
    let today = new Date();

    let newPost = new Post({
      title : json.title,
      author: json.author,
      date: today.toLocaleDateString("en-US"),
      content: json.content,
      comments: []
    })

    newPost.save()
    
    res.end('ok');
  });

  return res.json()
});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res )=> {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
