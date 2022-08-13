//trash file

// Configuration
/*************************/
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }

const dbDebugger = require('debug')('app:db'); // arbitrary namespace


  console.log('Application Name: ' + config.get('name'));
 console.log('Mail Server: ' + config.get('mail.host'));
 //console.log('Mail Password: ' + config.get('mail.password'));
 
//dbDebugger('Connected to the database...');
