/*
This function catches any errors in the request process pipeline. 

If something goes wrong during the application startup, this function will not be executed.
*/
const winston = require('winston');

module.exports = function(err, req, res, next){
 winston.error(err.message, err);
 res.status(500).send('Something failed.');
};