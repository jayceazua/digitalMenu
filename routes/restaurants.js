const restaurantsRouter = require('express').Router();
const {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurants');

restaurantsRouter.route('/restaurant')
  // INDEX
  .get(allRestaurants)
  // CREATE
  .post(addRestaurant);

// NEW
restaurantsRouter.get('/restaurant/new', /* frontend goes here */);

restaurantsRouter.route('/restaurant/:id')
  // SHOW
  .get(getRestaurant)
  // UPDATE
  .patch(updateRestaurant)
  // DELETE
  .delete(deleteRestaurant);

// EDIT
restaurantsRouter.get('/restaurant/:id/edit', /** Frontend stuff goes here. */);

// connecting to individual menus
const locations = require('./locations');

restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, locations);


module.exports = restaurantsRouter