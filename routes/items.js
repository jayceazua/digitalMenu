const itemsRouter = require('express').Router();
const {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/items');
const { authenticate } = require('../middleware/authorization');

itemsRouter.route('/item')
  // INDEX
  .get(authenticate, allItems)
  // CREATE
  .post(authenticate, addItem);

itemsRouter.route('/item/:id')
  // READ
  .get(authenticate, getItem)
  // UPDATE
  .patch(authenticate, updateItem)
  // DELETE
  .delete(authenticate, deleteItem);

module.exports = itemsRouter