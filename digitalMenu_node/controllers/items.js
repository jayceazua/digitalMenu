const {Item} = require('../models/item');
const {Location} = require('../models/location')
const mongoose = require('mongoose');

// INDEX
const allItems = (req, res) => {
  Item.find().then((items) => {
    res.status(200).json(items)
  }).catch((err) => {
    res.status(500).json(err)
  })
}
// CREATE
const addItem = async (req, res) => {
  // need to research on how to do this cleaner
  req.body.location = mongoose.Types.ObjectId(req.locationId)
  const _location = await Location.findById(req.locationId);
  try {
    const item = await new Item(req.body)
    await item.save();
    _location.items.push(item._id);
    _location.save();
    return res.json(item).status(200);
  } catch (err) {
    return res.send(err).status(500);
  }
}
// READ
const getItem = (req, res) => {
  Item.findById(req.params.id)
  .then((item) => {
    res.status(200).json(item)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
}
// UPDATE
const updateItem = (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
  .then((item) => {
    res.status(200).json(item)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
}
// DELETE
const deleteItem = async (req, res) => {
  Item.findByIdAndDelete(req.params.id)
  .then((item) => {
  // delete from the parent schema
    res.status(200).json(item)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
}

module.exports = {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
}