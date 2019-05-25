
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: { type: String,required: true },
  description: { type: String, required: true },
  price: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Item", ItemSchema);
