const restaurantsRouter = require('express').Router();

// INDEX
// NEW
// CREATE
// SHOW
// EDIT
// UPDATE
// DELETE

// connecting to individual menus
const menus = require('./menus');
restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, menus);


module.exports = restaurantsRouter