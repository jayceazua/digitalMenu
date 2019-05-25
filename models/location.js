
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	locationName: String,
	streetAddress: String,
	state: String,
	city: String,
	zipcode: String,
	locationNumber: { type: String, index: true, unique: true },
	items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
}, {
	timestamps: true
});

module.exports = mongoose.model("Location", LocationSchema);
