const express = require('express');
const path = require('path');
const mongoose = require('mongoose'), Schema = mongoose.Schema;
const { parse } = require('querystring');

const app = express();
const port = process.env.PORT || 5000;

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
app.get('/api/getData', (req, res) => {

  db.collection("posts").find({}, async function(err, docs){
    if (err) console.log(err);
    else{
      //docs is a Cursor, toArray returns a Promise so must wait on that
      let allposts = await docs.toArray();
      res.send({ express: {"posts": allposts}});
    } 
  })  
});

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
      Post.update({_id : json.pid}, {$push: { comments:comment }}, {upsert: true}, function(err){console.log(err)})
    }
    
    res.end('ok');
  });

  res.send({"response":"200"})

});

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
  
  res.send({"response":"200"})
});

app.get('/api/auth', (req, res) => {
  res.send({ express: serverData });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
