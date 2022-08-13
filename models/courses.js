// Using an Array of Sub-documents Documents
const mongoose = require('mongoose');
const Joi = require('joi');

// Schema
const authorSchema = new mongoose.Schema({name: String});
const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String, 
  authors: [authorSchema],
  tags: [String],
  isPublished: {type:Boolean, default: false},
  date: {type: Date, default:Date.now()}
}));

async function createCourse(name, authors,tags) {
  const courses = new Course({
      name, 
      authors,
      tags
    });
  const result = await courses.save();
  console.log(result);
}
async function createCourseT(name) {
  const course = new Course({name});
  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Comedy';
  course.save();
}
async function updateAuthor1(courseId) {
  const course = await Course.update({
    _id: courseId
  }, {
    $set: {
      'author.name': 'Adult'
    }
  });
}
async function updateAuthor(courseId) {
  const course = await Course.update({
    _id: courseId
  }, {
    $unset: {
      'author.name': ''
    }
  });
}
async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
/*************** Executions ***********/

// Test updateGenre1('62ab6a64720e056b9c344d49');
// removeAuthor('62ab6a64720e056b9c344d49', '62a9730ddf54c09168f8d783')
// addAuthor('62a9730ddf54c09168f8d784',new Author({ author: 'Adolf Hitler'}));
 /*createCourse('Node Course', 
 [
  new Author({ name: 'Jim Beam'}),
  new Author({ name: 'Jack Daniels'}),
  new Author({ name: 'Sally Slutvich'})
 ]
 );
 */
 createCourse('Math 201', 
 [new Author({ name: 'Jon LaBuddy'})],
 ['math','geometry']
 );
// Test createCourse('Promises');//Scenario: Create Course minus author
// updateGenre('MovieID')

/*************** Validator ***********/

function validateCourse(Course) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(), 
    authors: Joi.array(),
    tags: Joi.array()
  });
  return Joi.validate(Course, schema);
}

/*************** Exports ***********/
exports.Course = Course;
exports.validate = validateCourse;
// exports.Author = Author;
// exports.validate = validateGenre;
