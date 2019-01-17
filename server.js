"use strict";
require('dotenv').config();
const path = require('path');
const express = require("express");
const methodOverride = require('method-override');
const app = express();
const port = process.env.PORT || 3000

// database connection

// routes
const menus = require('./controllers/menus');
app.use(menus);

app.listen(port, () => {
  console.log(`Your menu is listening on port: ${port}`)
});