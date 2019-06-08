const itemsRouter = require('express').Router();
const {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/items');
const {
  authenticate
} = require('../middleware/authorization');

itemsRouter.get('/items', allItems)

itemsRouter.post('/item', addItem);

itemsRouter.route('/item/:id')
  // READ
  .get(getItem)
  // UPDATE
  .patch(updateItem)
  // DELETE
  .delete(deleteItem);

module.exports = itemsRouter