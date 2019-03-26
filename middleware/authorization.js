const User = require('../models/user');
const jwt = require('jsonwebtoken');
// middle for authorization
const auth = (req, res, next) => {
  let token = req.headers.cookie;
  if (!token) {
    return res.status(401).send();
  } else {
    let cookieToken = req.headers.cookie.split("=")[1]
    // verify a token symmetric - synchronous
    let userId = jwt.verify(cookieToken, process.env.SECRET)._id;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          return Promise.reject()
        }
        next();
      })
      .catch((err) => {
        res.status(401).send("Cock sucker");
      })
  }
}

module.exports = {
  auth
}