//require('express-async-errors');
const winston = require('winston');
const express = require('express');
//const { config } = require('dotenv');
const config = require('config');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
/***********Pug**************/
//require('./startup/pug')(app);
/***********Helmet**************/
//require('./startup/helmet')(app);
/***********Morgan**************/
//require('./startup/morgan')(app);
/************Port*************/
const port = process.env.PORT || config.get('db.port');

const server = app.listen(port, () => winston.info(`Listening on port: ${port}...`));
//console.log(server);
module.exports = server;