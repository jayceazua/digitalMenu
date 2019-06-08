const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

let UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true, // <- this is deprecated; hopefully mongoose updates this.
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} not a valid email`
    }
  },
  phoneNumber: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: "Restaurant"
  }],
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// overriding method to show limited amount of data
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'firstName', 'phoneNumber', 'lastName']);
}

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.SECRET).toString();
  // user.tokens.push({ access, token })
  user.tokens = user.tokens.concat([{
    access,
    token
  }]);
  return user.save().then(() => {
    return token
  }).catch((err) => {
    throw err
  })
};

UserSchema.methods.removeToken = function (token) {
  let user = this;
  return user.update({
    $pull: {
      tokens: {
        token
      }
    }
  });
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.SECRET)
  } catch (e) {
    return Promise.reject()
  }

  //success case
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;
  return User.findOne({
      email
    })
    .then((user) => {
      if (!user) {
        // use this here to custom make if user is wrong
        return Promise.reject();

      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user)
          } else {
            reject()
          }
        });
      });
    });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    // user.password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {
  User
}