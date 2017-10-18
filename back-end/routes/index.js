var express = require('express');
var router = express.Router();
var path = require('path');
const Poll = require('../models/Poll');
var cors = require('cors');
router.use(cors());

router.get('/api/polls', (req, res) => {
  Poll.find({}).exec()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.log(error)
      res.json({ error })
    })
});
router.patch('/api/poll/vote/:_id', (req, res) => {
  if (req.body.addedChoice) {
    Poll.findOne({ _id: req.params._id })
      .then(something => {
        something.votesByChoice.push({ choiceName: req.body.choice, count: 1 });
        something.allChoices.push(req.body.choice);
        return something.save()
      })
      .then(saved => {
        res.json(saved);
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
      res.json(something);
    })
    .catch(error => res.json({ error }));
});
router.post('/api/poll/create', (req, res) => {
  const poll = new Poll(req.body.poll);
  poll.save()
    .then(saved => {
      res.json(saved);
    })
    .catch(error => {
      console.log(error)
      res.json({ error });
    });
});
router.patch('/api/poll/edit/:_id', (req, res) => {
  const newPoll = new Poll(req.body.poll);

  Poll.findByIdAndUpdate({ _id: req.params._id }, newPoll, { new: true }).exec()
    .then(updatedPoll => {
      res.json(updatedPoll);
    })
    .catch(error => {
      console.log(error);
      res.json({ error });
    })
});

module.exports = router;
