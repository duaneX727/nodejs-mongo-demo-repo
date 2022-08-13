const config = require('config');

module.exports = function(){
  /************AccessKey*************/
  if (!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    //process(1);
   }
   
};