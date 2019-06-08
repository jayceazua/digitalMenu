const {
  Location
} = require('../models/location');
const {
  Restaurant
} = require('../models/restaurant');
const _ = require('lodash');

const allLocations = async (req, res) => {
  try {
    const locations = await Restaurant.findById(req.restaurantId).populate('locations');
    res.status(200).json(locations.locations)
  } catch (error) {
    res.status(500).json(error);
  }
  // const locations = await Restaurant.findById(req.restaurantId).populate('locations'); 
  // locations ?
  //   res.status(200).json(locations.locations)
  // :
  //   res.status(500).json('Something went wrong.');
};

const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    res.status(200).json(location);
  } catch {
    return res.status(500).send('Something went wrong');
  }
};

const addLocation = async (req, res) => {
  try {
    const body = _.pick(req.body, ['locationName', 'streetAddress', 'state', 'city', 'zipcode', 'locationPhoneNumber']);
    const restaurant = await Restaurant.findById(req.restaurantId);
    const location = await new Location(body);
    await location.save();
    restaurant.locations.push(location._id);
    await restaurant.save();
    return res.status(200).json(location);
  } catch {
    return res.status(500).send('Something went wrong');
  }
};

const updateLocation = async (req, res) => {
  try {
    const _location = await Location.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json("Succesfully updated.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteLocation = async (req, res) => {
  try {
    restaurant = await Restaurant.findById(req.restaurantId);
    restaurant.locations.remove(req.params.id);
    await restaurant.save();
    Location.findByIdAndDelete(req.params.id)
    res.status(200).json("Succesfully deleted.");
  } catch {
    res.status(500).json('Something went wrong.')
  }
};

module.exports = {
  allLocations,
  getLocation,
  addLocation,
  updateLocation,
  deleteLocation
}