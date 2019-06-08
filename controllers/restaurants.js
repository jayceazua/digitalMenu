const { Restaurant } = require('../models/restaurant');
const { User } = require('../models/user'); 

const allRestaurants = async (req, res) => {
    const restaurants = await User.findById(req.user._id).populate('restaurants')
    restaurants ? 
      res.status(200).json(restaurants.restaurants)
    :
      res.status(500).json('Something went wrong.');
};

const addRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    req.user.restaurants ?
      req.user.restaurants.push(restaurant)
    :
      user.restaurants = [restaurant];
    await restaurant.save();
    await req.user.save();
    // SendGrid.sendWebsiteRequestEmail(user);
    res.status(200).json(restaurant)
  } catch(err) {
    res.status(500).json(err);
  }
};

const getRestaurant = async (req, res) => {
  restaurant = await Restaurant.findById(req.params.id);
  restaurant ? 
    res.status(200).json(restaurant)
  :
    res.status(500).json('Something went wrong.')
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

const deleteRestaurant = async (req, res) => {
  // TEST THIS.
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    await req.user.restaurants.remove(req.params.id);
    res.status(200).json("Successfully deleted.");
  }
  catch(err) {
    res.status(500).json(err)
  }
};

module.exports = {
  allRestaurants,
  addRestaurant,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant
}
