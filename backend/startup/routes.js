const express = require('express');
const users = require('../routes/users');
const auth = require('../routes/auth');
const wordsByTopics = require('../routes/wordsByTopics');
const phrasesByTopics = require('../routes/phrasesByTopics');
const grammarByTopics = require('../routes/grammarByTopics');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/wordsByTopics', wordsByTopics);
  app.use('/api/phrasesByTopics', phrasesByTopics);
  app.use('/api/grammarByTopics', grammarByTopics);
  app.use(error);
};
