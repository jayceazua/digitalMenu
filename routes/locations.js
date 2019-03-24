const locationsRouter = require('express').Router();

locationsRouter.route('/location')
  // INDEX
  .get((req, res) => {
    res.send('GET All locations from the restaurant');
  })
  // CREATE
  .post((req, res) => {
    res.json('CREATE new location');
  });

// NEW
locationsRouter.get('/location/new', (req, res) => {
  res.send('GET form to create a location');
});

locationsRouter.route('/location/:id')
  // SHOW
  .get((req, res) => {
    res.send('GET an individual location to view');
  })
  // UPDATE
  .patch((req, res) => {
    res.json('UPDATE a location');
  })
  // DELETE
  .delete((req, res) => {
    res.json('DELETE a location and it\'s items');
  });

// EDIT
locationsRouter.get('/location/:id/edit', (req, res) => {
  res.send('GET form to edit');
});

// connecting to individual items
const items = require('./items');
locationsRouter.use('/location/:id', (req, res, next) => {
  req.locationId = req.params.id;
  next();
}, items);

module.exports = locationsRouter