const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const randomWord = await req.app.get('db').getRandomWord();
  res.send(randomWord);
});
