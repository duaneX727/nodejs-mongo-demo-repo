const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  } 
});
const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(Genre){
  const schema = Joi.object({
   name: Joi.string().min(5).required().max(50).required()
  });
  return Joi.validate(Genre, schema);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;