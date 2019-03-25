const validator = require('validator');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  country: String,
  stateOrProvince: String,
  city: String,
  zipOrPostalCode: String,
  streetAddress: String,
  restaurantName: {
    type: String,
    required: true,
    lowercase: true
  },
  locations: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }]
}, {
  timestamps: true
});


const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = { Restaurant };