const _ = require('lodash');
const {Restaurant} = require('../models/restaurant');

// INDEX
const allRestaurants = (req, res) => {
  Restaurant.find({}) // do not know if i need to populate the locations as well for the restaurants.
  .then((restaurant) => {
    res.json(restaurant);
  })
  .catch((err) => {
    res.status(404).json(err)
  })
};
// CREATE
const addRestaurant = (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save()
  .then((_restaurant) => {
    res.json(_restaurant)
  })
  .catch((err) => {
    res.status(404).json(err)
  })
};
// READ
const getRestaurant = (req, res) => {
  
};
// UPDATE
const updateRestaurant = (req, res) => {
  console.log(req.body);
};
// DELETE
const deleteRestaurant = (req, res) => {
  console.log(req.body);
};

module.exports = {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
}