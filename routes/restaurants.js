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


restaurantsRouter.post('/restaurant', authenticate, addRestaurant);

restaurantsRouter.get('/restaurants', authenticate, allRestaurants);

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