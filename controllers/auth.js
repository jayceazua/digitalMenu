/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */
const _ = require('lodash');
const {
  User
} = require('../models/user');

// const { sendEmail } = require('../middleware/mailgun-config');

// CREATE / SIGNUP
/** Sign up users/ register them */
const signup = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  });
}

// LOGIN
/** have users login <- don't worry about this */
const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((err) => {
    res.status(400).send()
  });
};

//LOGOUT
/** have users logout <- don't worry about this */
const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
};

module.exports = {
  signup,
  login,
  logout
}