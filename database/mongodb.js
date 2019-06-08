const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const dbname = process.env.DB_NAME;
const dbURI = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbname}`;
mongoose.connect(dbURI, {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('Database is up!')
});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
// mongoose.set('debug', true);