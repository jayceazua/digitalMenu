const validator = require('validator');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  // name
  restaurantName: {
    type: String,
    required: true,
    lowercase: true
  },
  // address
  restaurantLocation: {
    type: String,
    required: true
  },
  // phone
  restaurantPhone: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    validate: {
      validator: validator.isMobilePhone,
      message: `{VALUE} not a valid phone number`
    }
  }
  // store id
});


const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = {
  Restaurant
};