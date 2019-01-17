const menusRouter = require('express').Router();

menusRouter.route('/menu')
  // INDEX
  .get((req, res) => {
    res.send('GET All menus from the restaurant');
  })
  // CREATE
  .post((req, res) => {
    res.json('CREATE new menu');
  });

// NEW
menusRouter.get('/menu/new', (req, res) => {
  res.send('GET form to create a menu menu');
});

menusRouter.route('/menu/:id')
  // SHOW
  .get((req, res) => {
    res.send('GET an individual menu to view');
  })
  // UPDATE
  .patch((req, res) => {
    res.json('UPDATE a menu');
  })
  // DELETE
  .delete((req, res) => {
    res.json('DELETE a menu and it\'s items');
  });
// EDIT
menusRouter.get('/:id/edit', (req, res) => {
  res.send('GET form to edit');
});


// connecting to individual items
const items = require('./items');
menusRouter.use('/menu/:id', (req, res, next) => {
  req.menuId = req.params.id;
  next();
}, items);

module.exports = menusRouter