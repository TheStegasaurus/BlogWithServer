const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Set up mongoose connection
let dev_db_url = 'mongodb://user:password123@ds029486.mlab.com:29486/blog-db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// API calls
app.get('/api/getData', (req, res) => {
  db.collection("Posts").find({}, async function(err, docs){
    if (err) console.log(err);
    else{
      //docs is a Cursor, toArray returns a Promise so must wait on that
      let allposts = await docs.toArray();
      res.send({ express: {"posts": allposts}});
    } 
  })  
});

app.post('/api/submitComment', (req, res) => {
  console.log("Comment submit received")
  res.send({"response":"all good bro"})
});

app.get('/api/submitPost', (req, res) => {
  res.send({ express: serverData });
});

app.get('/api/auth', (req, res) => {
  res.send({ express: serverData });
});

//console.log(JSON.stringify(serverData.posts))

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
