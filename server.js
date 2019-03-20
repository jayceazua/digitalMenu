require('dotenv').config();
const path = require('path');
const express = require("express");
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000

// database connection
require('./database/mongodb');
// setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
const website = require('./controllers/index');
const restaurants = require('./controllers/restaurants');
app.use(website); // Asim you code your stuff here for the frontend.
app.use(restaurants);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});