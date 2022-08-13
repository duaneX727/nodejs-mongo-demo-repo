async function createMovie(title, genre, numberInStock, dailyRentalRate){
  const movie = new Movie({title, genre, numberInStock, dailyRentalRate});
  const result = await movie.save();
  console.log(result);
}
async function createMovieT(title){
  const movie = new Movie({title});
  const result = await movie.save();
  console.log(result);
}

async function updateGenre(movieId){
  const movie = await Movie.findById(movieId);
  movie.genre.name = 'Comedy';
  movie.save();
}
async function updateGenre1(movieId){
  const movie = await Movie.update({_id: movieId},{$set:{'genre.name': 'Adult'}} );
}
async function updateGenre2(movieId){
  const movie = await Movie.update({_id: movieId},{$unset:{'genre.name': ''}} );
}
/*************** Executions ***********/
 
//Pass updateGenre1('62ab6a64720e056b9c344d49');
//removeGenre('62ab6a64720e056b9c344d49', '62a9730ddf54c09168f8d783')
//addGenre('62acb6a979664b64e09784c6',new Genre({ genre: 'Action'}));
//createMovie('Friends', new Genre({ name: 'Horror' }), 0, 0);
//Pass createMovie('Promises');//Scenario: Create Movie minus genre
//updateGenre('MovieID')
