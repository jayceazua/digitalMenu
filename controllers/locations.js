const { Location } = require('../models/location');
const Restaurant = require('../models/restaurant')
const mongoose = require('mongoose');

// Asim - gets all locations of a restaurant.
const allLocations = async (req, res) => {
  const locations = await Restaurant.findById(req.restaurantId).populate('locations');
  console.log('locations:', locations.locations);  
  locations ?
    res.status(200).json(locations.locations)
  :
  res.status(500).json(err);
};

const getLocation = (req, res) => {
  Location.findById(req.params.id)
  .then((_location) => {
    res.status(200).json(_location);
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

const addLocation = async (req, res) => {
  console.log('req.body:', req.body);
  req.body.restaurantChain = mongoose.Types.ObjectId(req.restaurantId) //TODO: what is this line doing?
  const _restaurant = await Restaurant.findById(req.restaurantId);
  try {
    const location = await new Location(req.body)
    await location.save();
    _restaurant.locations.push(location._id);
    _restaurant.save();
    return res.status(200).json(location);
  } catch (err) {
    return res.send(err).status(500);
  }
};

const updateLocation = (req, res) => {
  Location.findByIdAndUpdate(req.params.id, req.body)
  .then((_location) => {
    res.status(200).json("Succesfully updated.");
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

const deleteLocation = (req, res) => {
  /** TODO: Need to remove from the parent schema */
  Location.findByIdAndDelete()
  .then((_location) => {
    res.status(200).json("Succesfully deleted.");
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

module.exports = {
  allLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation
}