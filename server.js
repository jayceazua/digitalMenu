require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 5000
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: process.env.SENTRY_DSN });

// database connection
require('./database/mongodb');

// setting up middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
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

// routes
app.get('/', (req, res) => {
  // we could use this route as a place for documentation???
  res.json('Welcome to the digital menu backend api')
});

const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants');
app.use(auth)
app.use(restaurants);



app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});
