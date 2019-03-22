const User = require('../models/User');
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
          return Promise.reject() // <- this can be changed if needed to a redirect.
        }
        console.log("Authorized user!");
        next();
      })
      .catch((err) => {
        res.status(401).send();
      })
  }

  // parse the cookie everything from nToken={everything after the equal sign}
  // decode the jwt
  // in the payload get the user id and findById
  // if no user is found return error kick the mf out
  // else return success to the next
}

module.exports = {
  auth
}