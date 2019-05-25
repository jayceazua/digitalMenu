const validator = require('validator');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	// TODO: switch to yelp or google or facebook business api 
	name: String,
	streetAddress: String,
	state: String,
	city: String,
	zipcode: String,
	locationNumber: {
		type: String,
		index: true,
		unique: true,
	},
	// menu/ items/ price adjustments
	items: [{
		type: Schema.Types.ObjectId,
		ref: 'Item',
	}]
}, {
	timestamps: true
});

module.exports = mongoose.model("Location", LocationSchema);
