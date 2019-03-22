/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({

  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  // username: { // <- maybe add this
  //   type: String,
  //   index: true,
  //   unique: true,
  //   required: [true, 'username Required.'],
  // },

  email: {
    type: String,
    required: [true, 'Email Required'],
    trim: true,
    index: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} not a valid email`
    }
  },

  password: {
    type: String,
    required: [true, 'Password Required'],
    minlength: [6, 'Password must be longer than 6 characters.'],
  },

  // storage for tokens <-- don't save token into the database
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  // reference the restaurants with the user
  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

// overriding method to show limited amount of data
UserSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.SECRET, { expiresIn: "60 days" }).toString();
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
    decoded = jwt.verify(token, process.env.SECRET) // here goes out secret
  } catch (e) {
    return Promise.reject()
  }

  // success case
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

const User = mongoose.model('User', UserSchema);
module.exports = {
  User
}