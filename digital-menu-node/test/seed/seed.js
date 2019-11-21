const {
  ObjectID
} = require('mongodb');
const jwt = require('jsonwebtoken');
const {
  User
} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: "azua@example.com",
  password: "asdzxc123",
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, 'someSecret').toString()
  }]
}, {
  _id: userTwoId,
  email: "dani@example.com",
  password: "qweasd123"
}];

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();
    // Promise all method waits for all promises to resolve.
    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

module.exports = {
  users,
  populateUsers
}