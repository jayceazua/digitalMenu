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
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});


const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = { Restaurant };