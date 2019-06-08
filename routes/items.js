const itemsRouter = require('express').Router();
const {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/items');

itemsRouter.route('/item')
  // INDEX
  .get(allItems)
  // CREATE
  .post(addItem);

itemsRouter.route('/item/:id')
  // READ
  .get(getItem)
  // UPDATE
  .patch(updateItem)
  // DELETE
  .delete(deleteItem);

module.exports = itemsRouter