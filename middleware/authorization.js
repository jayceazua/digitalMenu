const {
  User
} = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  if (req.cookies && req.cookies.nToken) {
      const uid = jwt.decode(req.cookies.nToken, process.env.SECRET)._id;
      User.findById(uid).then(user => { 
          req.user = user;
          next();
      });
  } else {
    return res.status(401).send("User not logged in");
  };
}

module.exports = {
  authenticate
}