const {
  allLocations,
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');

const locationsRouter = require('express').Router();

locationsRouter.route('/location')
  // INDEX
  .get(allLocations)
  // CREATE
  .post(addLocation);

// NEW
locationsRouter.get('/location/new', (req, res) => {
  res.send('GET form to create a location');
});

locationsRouter.route('/location/:id')
  // SHOW
  .get(getLocation)
  // UPDATE
  .patch(updateLocation)
  // DELETE
  .delete(deleteLocation);

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