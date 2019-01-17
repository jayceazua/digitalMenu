const menusRouter = require('express').Router();

// CREATE
// READ
// UPDATE
// DELETE


// connecting to individual items
const items = require('./items');
menusRouter.use('/:id', (req, res, next) => {
  req.menuId = req.params.id;
  next();
}, items);

module.exports = {
  menusRouter
}