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

restaurantsRouter.post('/restaurant', addRestaurant);

restaurantsRouter.get('/restaurants', allRestaurants);

restaurantsRouter.route('/restaurant/:id')
  // SHOW
  .get(getRestaurant)
  // UPDATE
  .patch(updateRestaurant)
  // DELETE
  .delete(deleteRestaurant);

// connecting to individual menus
const locations = require('./locations');

restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, locations);


module.exports = restaurantsRouter