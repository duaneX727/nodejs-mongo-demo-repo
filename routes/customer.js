const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {Customer, validate} = require('../models/customer');



//GET all
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  });
// Get single
router.get('/:_id', async (req, res) => {
 const customer = await Customer.findById(req.params.id);
  //customer = customer.name;
  if(!customer) res.status(404).send(`The customer with the given ID was not found`);
  res.send(customer);
});
// POST
 router.post('/', auth, async (req, res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

 const customer = new Customer(
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone
    }
    );
    const result = await customer.save();
   
    res.send(result);
 });

 // Single PUT update
router.put('/:id',auth,async (req, res)=>{
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
  
  const customer = await Customer.findByIdAndUpdate(req.params.id,
    {
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  }, {new: true});
  
  if(!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});
  //Delete customer
router.delete('/:id', auth,async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if(!customer) return res.status(404).send(`The customer with the given ID was not found`);
  //const index = customers.indexOf(customer);
  //customers.splice(index, 1);
  res.send(customer);
});

module.exports = router;