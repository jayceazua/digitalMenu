const {
  allLocations,
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');
const {
  authenticate
} = require('../middleware/authorization');

const locationsRouter = require('express').Router();

locationsRouter.route('/location')
  // INDEX
  .get(authenticate, allLocations)
  // CREATE
  .post(authenticate, addLocation);

locationsRouter.route('/location/:id')
  // SHOW
  .get(authenticate, getLocation)
  // UPDATE
  .patch(authenticate, updateLocation)
  // DELETE
  .delete(authenticate, deleteLocation);

// connecting to individual items
const items = require('./items');
locationsRouter.use('/location/:id', (req, res, next) => {
  req.locationId = req.params.id;
  next();
}, items);

module.exports = locationsRouter