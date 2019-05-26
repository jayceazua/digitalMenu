const {
  allLocations,
  addLocation,
  getLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/locations');
const locationsRouter = require('express').Router();
const checkAuth = require('../middleware/authorization');

locationsRouter.get('/locations', checkAuth.authenticate, (req, res) => {
  allLocations(req, res);
});

locationsRouter.post('/location', checkAuth.authenticate, (req, res) => {
  addLocation(req, res);
});

locationsRouter.get('/location/:id', checkAuth.authenticate, (req, res) => {
  getLocation(req, res);
});

locationsRouter.patch('/location/:id', checkAuth.authenticate, (req, res) => {
  updateLocation(req, res);
});

locationsRouter.delete('/location/:id', checkAuth.authenticate, (req, res) => {
  deleteLocation(req, res);
});

// connecting to individual items
const items = require('./items');
locationsRouter.use('/location/:id', (req, res, next) => {
  req.locationId = req.params.id;
  next();
}, items);

module.exports = locationsRouter