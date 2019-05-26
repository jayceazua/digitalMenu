const {
  allLocations,
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');
const locationsRouter = require('express').Router();
const checkAuth = require('../middleware/authorization');

locationsRouter.get('/locations', checkAuth.authenticate, async (req, res) => {
  allLocations(req, res);
});

locationsRouter.post('/location', checkAuth.authenticate, async (req, res) => {
  addLocation(req, res);
});

locationsRouter.route('/location/:id', checkAuth.authenticate)
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