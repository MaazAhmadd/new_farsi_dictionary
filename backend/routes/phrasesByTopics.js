const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { validate, PhrasesByTopics } = require('../models/phrasesByTopics');

router.get('/', async (req, res) => {
  const phrasesByTopics = await PhrasesByTopics.find({});
  res.send(phrasesByTopics);
});
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let phrasesByTopics = await PhrasesByTopics.findOne({ card_name: req.body.card_name });
  if (phrasesByTopics) return res.status(400).send('Topics already registered');

  phrasesByTopics = new PhrasesByTopics(_.pick(req.body, ['card_name', 'phrases', 'image', 'color']));
  await phrasesByTopics.save();
  res.status(201).send(phrasesByTopics);
});
router.put('/:cardName', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let phrasesByTopics = await PhrasesByTopics.findOne({ card_name: req.body.card_name });
  if (!phrasesByTopics) return res.status(400).send('Topics not found');

  const topic = await PhrasesByTopics.findOneAndUpdate(
    req.params.cardName,
    {
      card_name: req.body.card_name,
      phrases: req.body.phrases,
      image: req.body.image,
      color: req.body.color,
    },
    { new: true }
  );
  res.send(topic);
});

module.exports = router;
