const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  // name
  restaurantName: {
    type: String,
    required: true
  },
  // address
  // phone
  restaurantPhone: {
    type: 
  }
  // store id
});


const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = {
  Restaurant
};