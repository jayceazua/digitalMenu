const {
  User
} = require('../models/user');
const _ = require('lodash')

const {
  sendEmail
} = require('../middleware/mailgun-config');

// SIGNUP
// CREATE / SIGNUP
/** Sign up users/ register them */
const signup = (req, res) => {
  let user = new User(req.body);

  user.save().then((user) => {

    return user.generateAuthToken();

  }).then((token) => {
    // send email
    sendEmail(user)

    res.header('x-token', token).send(user)

    // return res.status(200).send(user)
  }).catch((err) => {
    res.status(400).send(err)
  });
}

// LOGIN
const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-token', token)

      return res.status(200).send(user)
    });
  }).catch((err) => {
    res.status(400).send(err)
  });
}


//LOGOUT
const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send('User logged out.')
  }).catch((err) => {
    res.status(400).send(err)
  })
}


module.exports = {
  signup,
  login,
  logout
}