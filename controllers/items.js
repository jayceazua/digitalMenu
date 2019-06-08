
const { Item } = require('../models/item');
const { Location } = require('../models/location')

const allItems = async (req, res) => {
  const items = await Location.findById(req.locationId).populate('items'); 
  items ?
    res.status(200).json(items.items)
  :
  res.status(500).json('Something went wrong.');
};

const addItem = async (req, res) => {
  try {
    const _location = await Location.findById(req.locationId);
    const item = await new Item(req.body);
    await item.save();
    _location.items ? _location.items.push(item._id) : _location.items = [item._id];
    await _location.save();
    return res.status(200).send(item);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const updateItem = async (req, res) => {
  try {
    _item = await Item.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json('Succesfully updated');
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteItem = async (req, res) => {
  Item.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(200).json('Succesfully deleted.')
  })
  .catch((err) => {
    res.status(500).json(err)
  })
};

module.exports = {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
}