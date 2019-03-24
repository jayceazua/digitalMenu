const restaurantsRouter = require('express').Router();

restaurantsRouter.route('/restaurant')
  // INDEX
  .get()
  // CREATE
  .post();

// NEW
restaurantsRouter.get('/restaurant/new', /* frontend goes here */);

restaurantsRouter.route('/restaurant/:id')
  // SHOW
  .get()
  // UPDATE
  .patch()
  // DELETE
  .delete();

// EDIT
restaurantsRouter.get('/restaurant/:id/edit', /** Frontend stuff goes here. */);

// connecting to individual menus
const locations = require('./locations');
restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, locations);


module.exports = restaurantsRouter