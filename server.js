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

// routes
const restaurants = require('./controllers/restaurants');
app.use(restaurants);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
});