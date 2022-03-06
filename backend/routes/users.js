const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const { User, validate } = require('../models/user');

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/fav_words', auth, async (req, res) => {
  let favW = await User.findById(req.user._id).select('fav_words');
  favW = favW.fav_words.includes(req.body.fav_word);
  if (favW) return res.status(400).send('word already in favourites');
  favW = await User.findByIdAndUpdate(req.user._id, { $push: { fav_words: req.body.fav_word } }, { new: true });

  res.send(favW);
});
router.delete('/fav_words', auth, async (req, res) => {
  let favW = await User.findById(req.user._id).select('fav_words');
  favW = favW.fav_words.includes(req.body.fav_word);
  if (!favW) return res.status(400).send('word not in favourites');
  favW = await User.findByIdAndUpdate(req.user._id, { $pull: { fav_words: req.body.fav_word } }, { new: true });

  res.send(favW);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'fav_words']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
