const Joi = require('joi');
const mongoose = require('mongoose');

const phrasesByTopicsSchema = new mongoose.Schema({
  card_name: {
    type: String,
    required: true,
    maxlength: 512,
  },
  phrases: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    minlength: 3,
    required: true,
    maxlength: 4096,
  },
  color: {
    type: String,
    required: true,
    maxlength: 1024,
  },
});

const PhrasesByTopics = mongoose.model('PhrasesByTopics', phrasesByTopicsSchema);

function validatePhrasesByTopics(topic) {
  const schema = Joi.object({
    card_name: Joi.string().max(512).required(),
    phrases: Joi.array().required(),
    image: Joi.string().max(4096).required(),
    color: Joi.string().max(1024).required(),
  });

  return schema.validate(topic);
}

exports.PhrasesByTopics = PhrasesByTopics;
exports.validate = validatePhrasesByTopics;
