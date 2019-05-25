const Location = require('../models/location');
const Restaurant = require('../models/restaurant')

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
  try {
    const restaurant = await Restaurant.findById(req.restaurantId);
    const location = await new Location(req.body)
    await location.save();
    restaurant.locations.push(location._id);
    restaurant.save();
    return res.status(200).json(location);
  } catch {
    return res.status(500).send(err);
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