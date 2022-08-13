const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/sandbox')
  .then(() => console.log('Connected to SandBoxDb...'))
  .catch(err => console.error('Could not connect to vidlyDB...', err));

  
module.exports = mongoose;