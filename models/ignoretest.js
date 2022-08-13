const mongoose = require('mongoose');
const Joi = require('joi');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

mongoose.connect('mongodb://localhost/vidlyDB')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const genreSchema = new mongoose.Schema({
  name: String
});

const Genre = mongoose.model('Genre', genreSchema);

const Movie = mongoose.model('Movie', new mongoose.Schema({
  title: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 50
   },
   genre:{type:genreSchema, required: true},
   numberInStock: Number,
   dailyRentalRate: Number
}));

async function createMovie(title, genre) {
  const movie = new Movie({title, genre}); 
  const result = await movie.save();
  console.log(result);
}
async function updateGenre(movieId){
   const movie = await Movie.update({_id: movieId}, {$set:{
    'genre.name': 'Action'
   }});

   movie.genre.name = "Thriller";
   movie.save();
}

async function listMovies() { 
  const movies = await Movie.find();
  console.log(movies);
}
async function addGenre(movieId, genre){
  const movie = await Movie.findById(movieId);
  movie.genre.push(genre);
  movie.save();
}
async function removeGenre(movieId, genreId){
  const movie = await Movie.findById(movieId);
  const genre = movie.genres.id(genreId);
  genre.remove();
  movie.save();
}
//removeGenre('62a9730ddf54c09168f8d784', '62a9730ddf54c09168f8d783')
//addGenre('62a9730ddf54c09168f8d784',new Genre({ genre: 'Action'}));
createMovie('This Is Us', new Genre({ name: 'Family' }));
//updateGenre('MovieID')