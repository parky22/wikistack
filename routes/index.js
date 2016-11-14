'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
// require any data model js files

router.use(express.static(path.join(__dirname, '/public')));

router.get('/', function(req, res, next){
   res.render('index', {title: 'Wikistack.js'});
});

// examples from twitter-js solution
// a reusable function
  // function respondWithAllTweets (req, res, next){
  //   var allTheTweets = tweetBank.list();
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: allTheTweets,
  //     showForm: true
  //   });
  // }

  // // here we basically treet the root view and tweets view as identical
  // router.get('/', respondWithAllTweets);
  // router.get('/tweets', respondWithAllTweets);

  // // single-user page
  // router.get('/users/:username', function(req, res, next){
  //   var tweetsForName = tweetBank.find({ name: req.params.username });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsForName,
  //     showForm: true,
  //     username: req.params.username
  //   });
  // });

  // // single-tweet page
  // router.get('/tweets/:id', function(req, res, next){
  //   var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  //   res.render('index', {
  //     title: 'Twitter.js',
  //     tweets: tweetsWithThatId // an array of only one element ;-)
  //   });
  // });

  // // create a new tweet
  // router.post('/tweets', function(req, res, next){
  //   console.log("Body of post:");
  //   console.log(req.body);
  //   var newTweet = tweetBank.add(req.body.name, req.body.text);
  //   io.sockets.emit('new_tweet', newTweet);
  //   res.redirect('/');
  // });



module.exports = router;