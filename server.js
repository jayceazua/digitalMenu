"use strict";

const express = require("express");
const app = express();
const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`Your menu is listening on port: ${port}`)
});