const _ = require('lodash');
const {Restaurant} = require('../models/restaurant');

// INDEX
const allRestaurants = (req, res) => {
  Restaurant.find({}) // we could populate the locations associated
  .then((restaurants) => {
    res.status(200).json(restaurants);
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
    res.status(200).json("Successfully created.")
  })
  .catch((err) => {
    res.status(404).json(err)
  })
};
// READ
const getRestaurant = (req, res) => {
    Restaurant.findById(req.params.id) // we could populate the locations associated
    .then((_restaurant) => {
      res.status(200).json(_restaurant)
    })
    .catch((err) => {
      res.status(404).json(err)
    })
};
// UPDATE
const updateRestaurant = (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body)
  .then((_restaurant) => {
    res.status(200).json("Successfully updated.");
  })
  .catch((err) => {
    res.status(404).json(err)
  })
};
// DELETE
const deleteRestaurant = (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
  .then((_restaurant) =>{
    res.status(200).json("Successfully deleted.");
  })
  .catch((err) => {
    res.status(404).json(err)
  })
};

module.exports = {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
}