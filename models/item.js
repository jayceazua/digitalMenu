const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  location: [{
    type: Schema.Types.ObjectId,
    ref: 'Location'
  }],
  itemName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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