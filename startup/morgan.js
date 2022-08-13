const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup'); // arbitrary namespace
module.exports = function(app) {
  if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...');
     //console.log(process.env);
  }
};