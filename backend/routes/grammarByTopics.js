const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const { validate, GrammarByTopics } = require('../models/grammarByTopics');

router.get('/', async (req, res) => {
  const grammarByTopics = await GrammarByTopics.find({});
  res.send(grammarByTopics);
});
router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let grammarByTopics = await GrammarByTopics.findOne({ card_name: req.body.card_name });
  if (grammarByTopics) return res.status(400).send('Topics already registered');

  grammarByTopics = new GrammarByTopics(_.pick(req.body, ['card_name', 'grammars', 'image', 'color']));
  await grammarByTopics.save();
  res.status(201).send(grammarByTopics);
});
router.put('/:cardName', [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let grammarByTopics = await GrammarByTopics.findOne({ card_name: req.body.card_name });
  if (!grammarByTopics) return res.status(400).send('Topics not found');

  const topic = await GrammarByTopics.findOneAndUpdate(
    req.params.cardName,
    {
      card_name: req.body.card_name,
      grammars: req.body.grammars,
      image: req.body.image,
      color: req.body.color,
    },
    { new: true }
  );
  res.send(topic);
});

module.exports = router;
