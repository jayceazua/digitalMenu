const {User} = require('../models/user');

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
}

module.exports = {
  authenticate
}