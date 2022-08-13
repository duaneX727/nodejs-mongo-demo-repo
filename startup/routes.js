const express = require('express');
const customers = require('../routes/customer');
const logger = require('../middleware/logger');
const error = require('../middleware/error.js');
const rentals = require('../routes/rentals');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');


module.exports = function(app){
  app.use('/middleware/logger.js', logger);
  app.use(express.urlencoded({extended: true}));// key=value&key=value
  app.use('/api/customers', customers);
  //app.use('/api/courses', courses);
  app.use(express.static('public'));
  app.use('/api/rentals', rentals);
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  //app.use('/api/home', home);
  app.use('/api/auth', auth);
  app.use(express.json());
  
  app.use(error);
};