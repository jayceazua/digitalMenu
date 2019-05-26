const itemsRouter = require('express').Router();
const {
  allItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/items');
const checkAuth = require('../middleware/authorization');


itemsRouter.get('/items', checkAuth.authenticate, (req, res) => {
  allItems(req, res);
});

itemsRouter.post('/item', checkAuth.authenticate, (req, res) => {
  addItem(req, res);
});

itemsRouter.get('/item/:id', checkAuth.authenticate, (req, res) => {
  getItem(req, res);
});

itemsRouter.patch('/item/:id', checkAuth.authenticate, (req, res) => {
  updateItem(req, res);
});

itemsRouter.delete('/item/:id', checkAuth.authenticate, (req, res) => {
  deleteItem(req, res);
});

module.exports = itemsRouter