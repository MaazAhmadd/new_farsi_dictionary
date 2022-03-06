const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { validate, WordsByTopics } = require('../models/wordsByTopics');

router.get('/', async (req, res) => {
  const wordsByTopics = await WordsByTopics.find({});
  res.send(wordsByTopics);
});
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let wordsByTopics = await WordsByTopics.findOne({ card_name: req.body.card_name });
  if (wordsByTopics) return res.status(400).send('Topics already registered');

  wordsByTopics = new WordsByTopics(_.pick(req.body, ['card_name', 'words', 'image', 'color']));
  await wordsByTopics.save();
  res.status(201).send(wordsByTopics);
});
router.put('/:cardName', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let wordsByTopics = await WordsByTopics.findOne({ card_name: req.body.card_name });
  if (!wordsByTopics) return res.status(400).send('Topics not found');

  const topic = await WordsByTopics.findOneAndUpdate(
    req.params.cardName,
    {
      card_name: req.body.card_name,
      words: req.body.words,
      image: req.body.image,
      color: req.body.color,
    },
    { new: true }
  );
  res.send(topic);
});

module.exports = router;
