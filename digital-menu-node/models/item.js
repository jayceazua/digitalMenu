const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});


const Item = mongoose.model('Item', ItemSchema);
module.exports = {
  Item
};