const express = require('express');
const router = express.Router();
const {Course,validate} = require('../models/courses');
 

//GET all
router.get('/', async (req, res) => {
  const courses = await Course.find().sort('name');
  res.send(courses);
});


// Get single
router.get('/:id', async (req, res) => {
  let course = await Course.findById(req.params.id);
  //course = course.name;
  if(!course) res.status(404).send(`The course with the given ID was not found`);
  res.send(course);
});
// POST
 router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  let course = new Course(
    {
    name: req.body.name,
    authors: req.body.authors,
    tags:reg.body.tags
  }
    );
    course = await course.save();
    //courses.splice(courses.length,0,course)
    res.send(course);
 });

 // Single PUT update
router.put('/:id',async (req, res)=>{
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  const course = await Course.findByIdAndUpdate(req.params.id,{name: req.body.name}, {new: true});
  //const name = courses.find(c => c.name === req.body.name);
  if(!course) return res.status(404).send(`Invalid request`);
  res.send(course);
});
  //Delete course
router.delete('/:id', async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);
  if(!course) return res.status(404).send(`The course with the given ID was not found`);
  //const index = courses.indexOf(course);
  //courses.splice(index, 1);
  res.send(course);
});

module.exports = router;