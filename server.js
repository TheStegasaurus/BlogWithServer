const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;


// API calls
app.get('/api/getData', (req, res) => {
  res.send({ express: serverData });
});

app.get('/api/submitComment', (req, res) => {
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


const serverData = {
	posts: [
    {
      title: "Some ranty  political article",
      id: 1,
      author: "Joe Blow",
      date: "10/30/2015",
      content: `Among other things, Browning’s piece outlines how long-term trends like
       voter suppression and gerrymandering have rowning draws several comparisons between 
       the Nazi party’s rise to power and our current political moment (including an erosion
       of the judiciary as a check on executive power), and points out a key difference (namely,
       a campaign of misinformation and distrust of the news in lieu of direct censorship, 
       at least thus farother things, Browning’s piece outlines how long-term trends like
       voter suppression and gerrymandering have rowning draws several comparisons between 
       the Nazi party’s rise to power and our current political moment (including an erosion
       of the judiciary as a check on executive power), and points out a key difference (namely,
       a campaign of misinformation and distrust of the news in lieu of direct censorship, 
       at least thus farother things, Browning’s piece outlines how long-term trends like
       voter suppression and gerrymandering have rowning draws several comparisons between 
       the Nazi party’s rise to power and our current political moment (including an erosion
       of the judiciary as a check on executive power), and points out a key difference (namely,
       a campaign of misinformation and distrust of the news in lieu of direct censorship, 
       at least thus farother things, Browning’s piece outlines how long-term trends like
       voter suppression and gerrymandering have rowning draws several comparisons between 
       the Nazi party’s rise to power and our current political moment (including an erosion
       of the judiciary as a check on executive power), and points out a key difference (namely,
       a campaign of misinformation and distrust of the news in lieu of direct censorship, 
       at least thus farother things, Browning’s piece outlines how long-term trends like
       voter suppression and gerrymandering have rowning draws several comparisons between`,
      comments: [
        {
          c_id: 66,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Alvin G",
          c_content: `Hoo boy here i am in a comment section`
        },
        {
          c_id: 77,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Jay G",
          c_content: `Hey man this here is a quality post`
        },
        {
          c_id: 88,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Mark G",
          c_content: `WHOA a comment!`
        }
      ]
    },
    {
      title: "Some technical article",
      id: 2,
      author: "Shane G",
      date: "10/26/2015",
      content: `The most common use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation
       on the elements it iterates over, and returns the result. So for example, if we
       wanted to create an unordered list that showed the names of all our users, we
       could do something like this:use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation
       on the elements it iterates over, and returns the result. So for example, if we
       wanted to create an unordered list that showed the names of all our users, we
       could do something like this:use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation
       on the elements it iterates over, and returns the result. So for example, if we
       wanted to create an unordered list that showed the names of all our users, we
       could do something like this:use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation
       on the elements it iterates over, and returns the result. So for example, if we
       wanted to create an unordered list that showed the names of all our users, we
       could do something like this:use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation
       on the elements it iterates over, and returns the result. So for example, if we
       wanted to create an unordered list that showed the names of all our users, we
       could do something like this:use case for iterating over a list of data is map,
       which is an array method that iterates over an array, can perform a computation`,
       comments: [
        {
          id: 65,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Alvin G",
          c_content: `What a nice article`
        },
        {
          id: 64,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Alvin G",
          c_content: `Hmm i cant say that I quite understand what's going here`
        },
        {
          id: 63,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Alvin G",
          c_content: `Hmmmm`
        }
      ]
    },
    {
      title: "Some old article",
      id: 3,
      author: "Jay D",
      date: "10/26/2012",
      content: `"This black spirit mirror and other magical objects are thought to have
       been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and
       mathematician. The mirror was used as a 'shew-stone' -- one of many polished and
       lustrous things used by Dee to carry out his occult research into the world of 
       spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to
       summon visions of angels into the mirror's reflective surface. The two men held
       séances in England and on the Continent between 1583 and 1589."are thought to have
       been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and
       mathematician. The mirror was used as a 'shew-stone' -- one of many polished and
       lustrous things used by Dee to carry out his occult research into the world of 
       spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to
       summon visions of angels into the mirror's reflective surface. The two men held
       séances in England and on the Continent between 1583 and 1589."are thought to have
       been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and
       mathematician. The mirror was used as a 'shew-stone' -- one of many polished and
       lustrous things used by Dee to carry out his occult research into the world of 
       spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to
       summon visions of angels into the mirror's reflective surface. The two men held
       séances in England and on the Continent between 1583 and 1589."are thought to have
       been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and
       mathematician. The mirror was used as a 'shew-stone' -- one of many polished and
       lustrous things used by Dee to carry out his occult research into the world of 
       spirits. Dee worked with the medium and convicted criminal, Edward Kelley, to
       summon visions of angels into the mirror's reflective surface. The two men held
       séances in England and on the Continent between 1583 and 1589."are thought to have
       been owned by John Dee (1527 -- 1608/9), the Elizabethan magician, astrologer and
       mathematician. The mirror was used as a 'shew-stone' -- one of many polished and`,
       comments: [
        {
          c_id: 11,
          c_timestamp: "10/17/2018 20:49",
          c_author:"Amal G",
          c_content: `Hoo boy here i am in a comment section`
        },
        {
          c_id: 21,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Alvin G",
          c_content: `Hey man this here is a quality post`
        },
        {
          c_id: 31,
          c_timestamp: "10/17/2018 20:49",
          c_author: "Basim A",
          c_content: `WHOA a comment!`
        }
      ]
    }
  ]
}