const {
  Restaurant
} = require('../models/restaurant');
const {
  User
} = require('../models/user');
const jwt = require('jsonwebtoken');

const allRestaurants = (req, res) => {

  Restaurant.find({}).then((restaurants) => {
    return res.status(200).send([restaurants])
  }).catch(err => res.json(err))


  // try {

  /** One we get auth working we comment this out */
  // const restaurants = await User.findById(req.user._id).populate('restaurants')
  // console.log("Is the user being passed:", req.user._id)
  // res.status(200).send(restaurants.restaurants)

  // } catch (error) {
  //   res.send(error);
  // }
  // GET User Id from the cookies or headers.
  // let userId = jwt.verify(req.cookies.dmToken, process.env.SECRET)._id;
  // console.log("User id works:", req.user._id)
  // const restaurants = await User.findById(req.user._id).populate('restaurants')
  // restaurants ?
  // res.status(200).json(restaurants.restaurants) :
  // res.status(500).json('Something went wrong.');
};

const addRestaurant = (req, res) => {
  const restaurant = new Restaurant(req.body);
  restaurant.save().then((restaurant) => {
    return res.status(200).json(restaurant)
  }).catch(err => res.json(err))
  // try {
  //   const restaurant = new Restaurant(req.body);
  //   req.user.restaurants ?
  //     req.user.restaurants.push(restaurant) :
  //     user.restaurants = [restaurant];
  //   await restaurant.save();
  //   await req.user.save();
  //   // SendGrid.sendWebsiteRequestEmail(user);
  //   res.status(200).json(restaurant)
  // } catch (err) {
  //   res.status(500).json(err);
  // }
};

const getRestaurant = async (req, res) => {
  console.log("This should be the restaurant id:", req.params.id)
  restaurant = await Restaurant.findById(req.params.id);
  restaurant ?
    res.status(200).json(restaurant) :
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
    // await req.user.restaurants.remove(req.params.id);
    res.status(200).json("Successfully deleted.");
  } catch (err) {
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