// const validator = require('validator');
// const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  restaurantName: { type: String, required: true },
  locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
