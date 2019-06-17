const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  restaurantName: {
    type: String,
    required: true
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