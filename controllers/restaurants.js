const restaurantsRouter = require('express').Router();

restaurantsRouter.route('/restaurant')
  // INDEX
  .get((req, res) => {
    res.send('GET All restaurants');
  })
  // CREATE
  .post((req, res) => {
    res.json('CREATE new restaurant');
  });

// NEW
restaurantsRouter.get('/restaurant/new', (req, res) => {
  res.send('GET form to create a new restaurant');
});

restaurantsRouter.route('/restaurant/:id')
  // SHOW
  .get((req, res) => {
    res.send('GET an individual restaurant to view');
  })
  // UPDATE
  .patch((req, res) => {
    res.json('UPDATE a restaurant');
  })
  // DELETE
  .delete((req, res) => {
    res.json('DELETE a restaurant and it\'s menus');
  });

// EDIT
restaurantsRouter.get('/restaurant/:id/edit', (req, res) => {
  res.send('GET form to edit');
});

// connecting to individual menus
const menus = require('./menus');
restaurantsRouter.use('/restaurant/:id', (req, res, next) => {
  req.restaurantId = req.params.id;
  next();
}, menus);


module.exports = restaurantsRouter