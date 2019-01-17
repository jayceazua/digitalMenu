const itemsRouter = require('express').Router();

itemsRouter.route('/item')
  // INDEX
  .get((req, res) => {
    res.send('GET All items');
  })
  // CREATE
  .post((req, res) => {
    res.json('CREATE new item');
  });

// NEW
itemsRouter.get('/item/new', (req, res) => {
  res.send('GET form to create a new item');
});

itemsRouter.route('/item/:id')
  // SHOW
  .get((req, res) => {
    res.send('GET an individual item to view');
  })
  // UPDATE
  .patch((req, res) => {
    res.json('UPDATE item');
  })
  // DELETE
  .delete((req, res) => {
    res.json('DELETE item');
  });

// EDIT
itemsRouter.get('/item/:id/edit', (req, res) => {
  res.send('GET form to edit');
});

module.exports = itemsRouter