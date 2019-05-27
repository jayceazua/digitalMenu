
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  locationName: String,
	streetAddress: String,
	state: String,
	city: String,
	zipcode: String,
	locationPhoneNumber: String,
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
  }]
}, {
  timestamps: true
});

const Location = mongoose.model("Location", LocationSchema);
module.exports = { Location }
