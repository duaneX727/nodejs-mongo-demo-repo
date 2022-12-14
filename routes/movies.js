const {Movie, validate} = require('../models/movies');
const auth = require('../middleware/auth');
const {Genre} = require('../models/genre');
const express = require('express');
const router = express.Router();

//GET all
router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

// POST
router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send('Invalid genre.');

  const movie = new Movie({ 
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
    movie = await movie.save();
    //movies.splice(movies.length,0,movie)
    res.send(movie);
 });
// Get single
router.get('/:id', auth, async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  //movie = movie.name;
  if(!movie) res.status(404).send(`The movie with the given ID was not found`);
  res.send(movie);
});


 // Single PUT update
router.put('/:id',auth, async (req, res)=>{
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)
  ;
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  const movie = await Movie.findByIdAndUpdate(req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    }, {new: true});
  if(!movie) return res.status(404).send('The movie with the given ID was not found.');
  res.send(movie);
});
  //Delete movie
router.delete('/:id', auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if(!movie) return res.status(404).send(`The movie with the given ID was not found`);
  
  res.send(movie);
});

module.exports = router;