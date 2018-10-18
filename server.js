const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;

const app = express();
const port = process.env.PORT || 5000;

// API calls
app.get('/api/getData', (req, res) => {
  res.send({ express: serverData });
});

app.get('/api/submitComment', (req, res) => {
  
  res.send({ express: serverData });
});

app.get('/api/submitPost', (req, res) => {
  
  res.send({ express: serverData });
});

app.get('/api/auth', (req, res) => {
  
  res.send({ express: serverData });
});


// Set up mongoose connection

let dev_db_url = 'mongodb://user:password123@ds029486.mlab.com:29486/blog-db';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', function (ref){
  console.log("Connected to mongo server")
})


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));


const serverData = {
	"posts": [
    {
      "title": "Some ranty  political article",
      "id": 1,
      "author": "Joe Blow",
      "date": "10/30/2015",
      "content":  '   We encourage people to work on problems that are neglected by others and large in scale. Unfortunately those are precisely the problems where people can do the most damage if their approach isn’t carefully thought through.  '  + 
      '     '  + 
      '   If a problem is very important, then setting back the cause is very bad. If a problem is so neglected that you’re among the first focused on it, then you’ll have a disproportionate influence on the field’s reputation, how likely others are to enter it, and many early decisions that could have path-dependent effects on the field’s long-term success.  '  + 
      '     '  + 
      '   We don’t particularly enjoy writing about this admittedly demotivating topic. Ironically, we expect that cautious people – the folks who least need this advice – will be the ones most likely to take it to heart.  '  + 
      '     '  + 
      '   Nonetheless we think cataloguing these risks is important if we’re going to be serious about having an impact in important but ‘fragile’ fields like reducing extinction risk.  '  + 
      '     '  + 
      '   In this article, we’ll list six ways people can unintentionally set back their cause. You may already be aware of most of these risks, but we often see people neglect one or two of them when new to a high stakes area – including us when we were starting 80,000 Hours.  '  + 
      '     '  + 
      '   Unfortunately, we don’t have a way to eliminate these risks entirely. The reality is that balancing these risks against the potential upside of new projects requires difficult judgment calls.  '  + 
      '     '  + 
      '   Fortunately, even when people start projects whose risks exceed their benefits, they often learn and improve over time. Their early mistakes might be seen as just another cost of training – so long as the errors aren’t catastrophic and they do learn from experience.  '  + 
      '     '  + 
      '   To that end, we finish by outlining how to reduce the chances of making things worse, even in the highest stakes areas. In brief, it raises the importance of finding good mentors, consistently seeking advice and feedback from experienced colleagues, and ensuring you’re a good fit for a project before you take actions with potentially large or long-term consequences.  '  + 
      '     '  + 
      '   The difficulty of knowing when you’re having a negative impact  '  + 
      '   What we’re concerned about in this article is the chance of leaving the world worse than it would have been, given what would have occurred had you not acted.  '  + 
      '     '  + 
      '   Unfortunately this can happen even if the most direct effects of your work are positive. For instance, you might do something helpful, but in the process get in the way of somebody who’s even better qualified.  '  + 
      '     '  + 
      '   Imagine a first year medical student who comes across a seriously injured pedestrian on a busy street, announces that they know first aid, and provides care on their own. They’ll look as though they’re helping. But imagine that a passerby who was about to call an ambulance refrained because the student showed up and took charge. In that case, the counterfactual may actually have been better medical care at the hands of an experienced doctor, making their apparent help an illusion.  '  + 
      '     '  + 
      '   Few people persist doing actions that are obviously harmful, but making things counterfactually worse like this is probably quite common and hard to detect.  '  + 
      '     '  + 
      '  Of course in this situation we would also need to think about the impact of freeing up the ambulance to attend to even more serious scenarios. Which is to say that measuring true impact can get complicated fast.  ',
      "comments": [
        {
          "c_id": 66,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Alvin G",
          "c_content": `Hoo boy here i am in a comment section`
        },
        {
          "c_id": 77,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Jay G",
          "c_content": `Hey man this here is a quality post`
        },
        {
          "c_id": 88,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Mark G",
          "c_content": `WHOA a comment!`
        }
      ]
    },
    {
      "title": "Some technical article",
      "id": 2,
      "author": "Shane G",
      "date": "10/26/2015",
      "content": '   The use case for iterating over a list of data is map,  '  + 
      '          which is an array method that iterates over an array, can perform a computation  '  + 
      '          on the elements it iterates over, and returns the result. So for example, if we  '  + 
      '          wanted to create an unordered list that showed the names of all our users, we  '  + 
      '          could do something like this:use case for iterating over a list of data is map,  '  + 
      '          which is an array method that iterates over an array, can perform a computation  '  + 
      '          on the elements it iterates over, and returns the result. So for example, if we  '  + 
      '          wanted to create an unordered list that showed the names of all our users, we  '  + 
      '          could do something like this:use case for iterating over a list of data is map,  '  + 
      '          which is an array method that iterates over an array, can perform a computation  '  + 
      '          on the elements it iterates over, and returns the result. So for example, if we  '  + 
      '          wanted to create an unordered list that showed the names of all our users, we  '  + 
      '          could do something like this:use case for iterating over a list of data is map,  '  + 
      '          which is an array method that iterates over an array, can perform a computation  '  + 
      '          on the elements it iterates over, and returns the result. So for example, if we  '  + 
      '          wanted to create an unordered list that showed the names of all our users, we  '  + 
      '          could do something like this:use case for iterating over a list of data is map,  '  + 
      '          which is an array method that iterates over an array, can perform a computation  '  + 
      '          on the elements it iterates over, and returns the result. So for example, if we  '  + 
      '          wanted to create an unordered list that showed the names of all our users, we  '  + 
      '          could do something like this:use case for iterating over a list of data is map,  '  + 
      '         which is an array method that iterates over an array, can perform a computation  ',
       "comments": [
        {
          "id": 65,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Alvin G",
          "c_content": `What a nice article`
        },
        {
          "id": 64,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Alvin G",
          "c_content": `Hmm i cant say that I quite understand what's going here`
        },
        {
          "id": 63,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Alvin G",
          "c_content": `Hmmmm`
        }
      ]
    },
    {
      "title": "Some old article",
      "id": 3,
      "author": "Jay D",
      "date": "10/26/2012",
      "content": '   This black spirit mirror and other magical objects are thought to have  '  + 
      '          been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and  '  + 
      '          mathematician. The mirror was used as a \'shew-stone\' -- one of many polished and  '  + 
      '          lustrous things used by Dee to carry out his occult research into the world of   '  + 
      '          spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to  '  + 
      '          summon visions of angels into the mirror\'s reflective surface. The two men held  '  + 
      '          séances in England and on the Continent between 1583 and 1589."are thought to have  '  + 
      '          been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and  '  + 
      '          mathematician. The mirror was used as a \'shew-stone\' -- one of many polished and  '  + 
      '          lustrous things used by Dee to carry out his occult research into the world of   '  + 
      '          spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to  '  + 
      '          summon visions of angels into the mirror\'s reflective surface. The two men held  '  + 
      '          séances in England and on the Continent between 1583 and 1589."are thought to have  '  + 
      '          been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and  '  + 
      '          mathematician. The mirror was used as a \'shew-stone\' -- one of many polished and  '  + 
      '          lustrous things used by Dee to carry out his occult research into the world of   '  + 
      '          spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to  '  + 
      '          summon visions of angels into the mirror\'s reflective surface. The two men held  '  + 
      '          séances in England and on the Continent between 1583 and 1589."are thought to have  '  + 
      '          been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and  '  + 
      '          mathematician. The mirror was used as a \'shew-stone\' -- one of many polished and  '  + 
      '          lustrous things used by Dee to carry out his occult research into the world of   '  + 
      '          spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to  '  + 
      '          summon visions of angels into the mirror\'s reflective surface. The two men held  '  + 
      '          séances in England and on the Continent between 1583 and 1589."are thought to have  '  + 
      '          been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and  '  + 
      '         mathematician. The mirror was used as a \'shew-stone\' -- one of many polished and  ',
       "comments": [
        {
          "c_id": 11,
          "c_timestamp": "10/17/2018 20:49",
          "c_author":"Amal G",
          "c_content": `Hoo boy here i am in a comment section`
        },
        {
          "c_id": 21,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Alvin G",
          "c_content": `Hey man this here is a quality post`
        },
        {
          "c_id": 31,
          "c_timestamp": "10/17/2018 20:49",
          "c_author": "Basim A",
          "c_content": `WHOA a comment!`
        }
      ]
    }
  ]
}