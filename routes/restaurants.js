
const controller = require('../controllers/asims_restaurants');

const restaurantsRouter = require('express').Router();
const {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurants');
const checkAuth = require('../middleware/authorization');

restaurantsRouter.post('/restaurant', checkAuth.authenticate, async (req, res) => {
  console.log('req.body:', req.body);  
  restaurant = await controller.createRestaurant(req.user, req.body);
  restaurant ?
    res.status(200).json(restaurant)
  :
    res.status(500).json('Something went wrong');
});

restaurantsRouter.get('/restaurants', checkAuth.authenticate, async (req, res) => {
  restaurants = await controller.getRestaurants(req.user._id);
  restaurants ?
    res.status(200).json(restaurants)
  :
    res.status(500).json('Something went wrong.');
});

restaurantsRouter.get('/restaurant/:id', checkAuth.authenticate, (req, res) => {
  getRestaurant(req, res);
});

restaurantsRouter.patch('/restaurant/:id', checkAuth.authenticate, (req, res) => {
  updateRestaurant(req, res);
});

restaurantsRouter.delete('/restaurant/:id', checkAuth.authenticate, (req, res) => {
  deleteRestaurant(req, res);
});


// connecting to individual menus
const locations = require('./locations');

restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, locations);


module.exports = restaurantsRouter