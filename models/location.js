const validator = require('validator');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  // which restaurant does it belong to?
  restaurantChain: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
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
        message: `{ VALUE } not a valid phone number`
      }
    },
    // menu/ items/ price adjustments
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = { Location }
