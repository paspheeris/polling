var express = require('express');
var router = express.Router();
var path = require('path');

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE);
// mongoose.Promise = global.Promise;
// const Poll = mongoose.model('Poll');
const Poll = require('../models/Poll');
var cors = require('cors');
router.use(cors());
/* GET home page. */
// app.get('*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'public/index.html'));
// });
// router.get('/', function (req, res) {
//   console.log('router.get /');
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
router.get('/api/polls', (req, res) => {
  console.log('in router.get(/api/polls)');
  Poll.find({}).exec()
    .then(data => {
      console.log(data)
      res.json(data);
    })
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
});
router.patch('/api/poll/vote/:_id', (req, res) => {
  console.log(req.body);

  if (req.body.addedChoice) {
    Poll.findOne({ _id: req.params._id })
      // .select('votesByChoice allChoices')
      .then(something => {
        // console.log(something);
        something.votesByChoice.push({ choiceName: req.body.choice, count: 1 });
        something.allChoices.push(req.body.choice);
        // console.log(something);        
        return something.save()
      })
      .then(saved => {
        res.json(saved);
        // console.log(saved);
      })
      .catch(error => {
        console.log(error);
      })
    return;
  }
  const poll = Poll.findOneAndUpdate(
    { _id: req.params._id, 'votesByChoice.choiceName': req.body.choice },
    { $inc: { 'votesByChoice.$.count': 1 } }, {
      new: true, //return the new Poll instead of the old one
      runValidators: true
    }).exec()
    .then(something => {
      // console.log(something);
      res.json(something);
      // res.json(JSON.stringify(something));
    })
    .catch(error => res.json({ error }));
  // poll.then(some => console.log(some));
  // res.send('ol');
  // res.json(JSON.stringify(poll));
});
router.post('/api/poll/create', (req, res) => {
  // console.log(req.body.poll);
  const poll = new Poll(req.body.poll);
  // console.log(poll);
  poll.save()
    .then(saved => {
      console.log(saved);
      res.json(saved);
    })
    .catch(error => {
      console.log(error)
      res.json({ error });
    });
});
router.patch('/api/poll/edit/:_id', (req, res) => {
  console.log(req.params._id);
  const newPoll = new Poll(req.body.poll);

  Poll.findByIdAndUpdate({ _id: req.params._id }, newPoll, { new: true }).exec()
    .then(updatedPoll => {
      console.log(updatedPoll);
      res.json(updatedPoll);
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    })
});

module.exports = router;
