const mongoose = require('mongoose');
const Joi = require('joi');
//const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

//Schema
const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean, default:false
  },
    name: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 50
   },
   phone: {
    type: String,
    required:true,
    minlength: 7,
    maxlength:10
   }  
});
// Plugin
//customerSchema.plugin(mongooseLeanVirtuals);
//Model
const Customer = mongoose.model('Customer', customerSchema);

//Validator
function validateCustomer(Customer){
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(7).max(10).required(),
    isGold: Joi.boolean()
  });
  return Joi.validate(Customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;