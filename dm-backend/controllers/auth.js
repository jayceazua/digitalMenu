/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */
const _ = require('lodash');
const {
  User
} = require('../models/user');

const {
  sendEmail
} = require('../middleware/mailgun-config');

// CREATE NEW USER
const signup = (req, res) => {
  const user = new User(req.body);
  user.save().then(() => {
    sendEmail(user);
    return user.generateAuthToken();
  }).then((token) => {
      res.cookie('x-auth', token, { maxAge: 900000, httpOnly: true });
  }).catch((e) => {
    res.status(400).json(e);
  });
};


// LOGS IN USER
const login = (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken()
    .then((token) => {
      
      res.cookie('x-auth', token, { maxAge: 900000, httpOnly: true });

    });
  }).catch((err) => {
    res.status(400).json(err);
  });
};




// LOGS OUT USER
const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).json();
  }, () => {
    res.status(400).json();
  });
};

module.exports = {
  signup,
  login,
  logout
}