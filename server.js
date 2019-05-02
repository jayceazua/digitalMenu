require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require("express");
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000 // front end create-react-app runs on 3000
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: process.env.SENTRY_DSN });
const logger = require('morgan');
// database connection
require('./database/mongodb');
// setting up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // <- maybe add this for testing
// override with POST having ?_method=DELETE & ?_method=PUT
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  };
}));
app.use(logger('dev'));
// routes
app.get('/', (req, res) => {
  // we could use this route as a place for documentation???
  res.json('Welcome to the digital menu backend api')
});

const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants');
app.use(auth)
app.use(restaurants);

// app.use('./middleware/log.js');
const myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);


app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)  
});