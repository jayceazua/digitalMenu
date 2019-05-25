const Restaurant = require('../models/restaurant');

const addRestaurant = (req, res) => {
  const restaurant = new Restaurant(req.body)
  restaurant.save()
  .then((_restaurant) => {
    res.status(200).json(restaurant)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

const getRestaurant = async (req, res) => {
  restaurant = await Restaurant.findById(req.params.id);
  restaurant ? 
  res.status(200).json(restaurant)
  : res.status(500).json('Somthing went wrong.')
};

const updateRestaurant = (req, res) => {
  Restaurant.findByIdAndUpdate(req.params.id, req.body)
  .then((_restaurant) => {
    res.status(200).json("Successfully updated.");
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

const deleteRestaurant = (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
  .then((_restaurant) =>{
    res.status(200).json("Successfully deleted.");
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

module.exports = {
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
}