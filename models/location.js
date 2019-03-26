const validator = require('validator');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  // which restaurant does it belong to?
  restaurantChain: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  // TODO: switch to yelp or google or facebook business api 
  restaurantLocation: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    // menu/ items/ price adjustments
    items: [{
      type: Schema.Types.ObjectId,
      ref: 'Item',
    }]
}, {
  timestamps: true
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = { Location }
