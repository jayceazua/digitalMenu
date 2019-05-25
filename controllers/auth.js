
const _ = require('lodash');
const User = require('../models/user');
// const { sendEmail } = require('../middleware/mailgun-config');

const signup = (req, res) => {
  // How do we check if a user already exists and return an error message? (Asim)
  let user = new User(req.body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  })
  .catch((e) => {
    res.status(400).send(e)
  });
};

const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
  .then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  })
  .catch((e) => {
    res.status(400).send(e)
  });
};

const logout = (req, res) => {
  req.user.removeToken(req.token)
  .then(() => {
    res.status(200).send()
  })
  .catch((e) => {
    res.status(400).send(e)
  });
};

module.exports = {
  signup, login, logout
};
