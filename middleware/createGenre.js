
const mongoose = require('../middleware/connectToDb');

const genreSchema = new mongoose.Schema({
  id: Number,
  name: String
 });


const Genre = mongoose.model('Genre', genreSchema);
async function createGenre(){
  const genre = new Genre({
    id: 1,
    name: String
  });
  try {
    const result = await genre.save();
    console.log(result);
 } 
 catch (ex) {
   for(let field in ex.errors){
    console.log(ex.errors[field].message);
   }

 }
}
 createGenre();