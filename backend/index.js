const express = require('express');
const app = express();
require('dotenv').config();

require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
