'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
const models = require('../models');
var Page = models.Page;
var User = models.User;

router.use(express.static(path.join(__dirname, '/pulic')));

// retrieve all wiki pages
router.get('/', function(req, res, next){
  Page.findAll({})
  .then(function(pages){
    console.log('pages', pages.map(p => p.get({plain:true})));
    res.render('index', {pages:pages});
  })
  .catch(next);
});

// retrieve the "add a page" form
router.get('/add', function(req, res, next){
   res.render('addpage.html');
   //res.render('index', {title: 'Wikistack.js'});
});

// submit a new page to the database
router.post('/', function(req, res, next){
    //res.json(req.body);

    var page = Page.build({
      title: req.body.title,
      content: req.body.content,
      status: 'open'
    });

    var user = User.build({
      name: req.body.name,
      email: req.body.email
    })
    // redirect to / after page save is complete
    page.save()
    .then(user.save())
    .then (function(result) {
      //res.json(result);
      res.redirect(result.route);
    })
    .catch (function(err){
      res.render('error.html',{message: err.message, error: err});
    })
});

router.get('/:urlTitle', function(req, res, next){
    //res.send(req.params.urlTitle);
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
   //res.json(foundPage);
   res.render('wikipage.html', {page: foundPage});
  })
  .catch(next);
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