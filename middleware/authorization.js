const {
  User
} = require('../models/user');
// const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  let token = req.header('x-auth');
  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch((err) => {
      res.status(401).send("User not logged in");
    });
  // if (req.cookies && req.cookies.dmToken) {
  //     const uid = jwt.decode(req.cookies.dmToken, process.env.SECRET)._id;
  //     User.findById(uid).then(user => { 
  //         req.user = user;
  //         next();
  //     });
  // } else {
  //   return res.status(401).send("User not logged in");
  // };
}

module.exports = {
  authenticate
}