const winston = require('winston');
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
const config = require('config');

module.exports = async function(){
  const db = await config.get('db.host');
  mongoose.connect(db)
  .then(() => winston.info(`Connected to ${db}...`));
};
