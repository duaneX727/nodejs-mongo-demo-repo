const auth = require('../middleware/auth');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');


router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
//Registering New Users
router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  // Check if user has not previously registered.
  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already registered.');
  // At this point, user is valid object and is not registered in the DB. So now, save this user in DB.
  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  
  const token = user.generateAuthToken();
  
  res.header('x-auth-token', token).send( _.pick(user, ['_id','name', 'email']));
});


module.exports = router;