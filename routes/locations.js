const {
  allLocations,
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');

const locationsRouter = require('express').Router();

locationsRouter.route('/locations')
  // INDEX
  .get(allLocations)

  locationsRouter.route('/location')
  // CREATE
  .post(addLocation);

locationsRouter.route('/location/:id')
  // SHOW
  .get(getLocation)
  // UPDATE
  .patch(updateLocation)
  // DELETE
  .delete(deleteLocation);

// connecting to individual items
const items = require('./items');
locationsRouter.use('/location/:id', (req, res, next) => {
  req.locationId = req.params.id;
  next();
}, items);

module.exports = locationsRouter