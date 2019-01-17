const websiteRouter = require('express').Router();

websiteRouter.get('/', (req,res) => {
  res.send('Digital Menu... coming soon');
});

module.exports = websiteRouter