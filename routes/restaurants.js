const restaurantsRouter = require('express').Router();
const {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurants');
const {
  authenticate
} = require('../middleware/authorization');

restaurantsRouter.route('/restaurant')
  // INDEX
  .get(authenticate, allRestaurants)
  // CREATE
  .post(authenticate, addRestaurant);

// NEW
restaurantsRouter.get('/restaurant/new', /* frontend goes here */);

restaurantsRouter.route('/restaurant/:id')
  // SHOW
  .get(authenticate, getRestaurant)
  // UPDATE
  .patch(authenticate, updateRestaurant)
  // DELETE
  .delete(authenticate, deleteRestaurant);


// connecting to individual menus
const locations = require('./locations');

restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, locations);


module.exports = restaurantsRouter