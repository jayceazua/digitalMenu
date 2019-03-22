const { User } = require('../models/user');
// middle for authorization
const authorization = (req, res, next) => {
  let token = req.get('x-auth');

  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject(); // might change this if we need unauth users
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch((err) => {
      res.status(401).json();
    });
}

module.exports = {
  authorization
}