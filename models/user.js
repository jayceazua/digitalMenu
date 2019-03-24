/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */

    
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const validator = require('validator');
// const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({

  fullname: {
    type: String, 
    trim: true, 
    required: true
  },

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

    restaurant: [{
      type: Schema.Types.ObjectId,
      ref: 'Restaurant'
    }]

}, {
  timestamps: true
});

// Users can be developers or just users
// if user is not dev they can search for user that is dev if they have the same skill


// Must use function here! ES6 => functions do not bind this!
UserSchema.pre("save", function(next) {
  // ENCRYPT PASSWORD
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};
UserSchema.index({fields: 'text'});
const User = mongoose.model('User', UserSchema);

module.exports = User

//  ====================================================


// // overriding method to show limited amount of data
// UserSchema.methods.toJSON = function () {
//   let user = this;
//   let userObject = user.toObject();
//   return _.pick(userObject, ['_id', 'email']);
// }

// UserSchema.methods.generateAuthToken = function() {
//   let user = this;
//   let access = 'auth';
//   let token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.SECRET ).toString();
//   // user.tokens.push({ access, token })
//   user.tokens = user.tokens.concat([{
//     access,
//     token
//   }]);
//   return user.save().then(() => {
//     return token
//   }).catch((err) => {
//     throw err
//   })
// };

// UserSchema.methods.removeToken = function (token) {
//   let user = this;
//   return user.update({ $pull: { tokens: { token } }
//   });
// };

// UserSchema.statics.findByToken = function (token) {
//   let User = this;
//   let decoded;

//   try {
//     decoded = jwt.verify(token, process.env.SECRET) // here goes out secret
//   } catch (e) {
//     return Promise.reject()
//   }

//   // success case
//   return User.findOne({
//     '_id': decoded._id,
//     'tokens.token': token,
//     'tokens.access': 'auth'
//   })
// };

// UserSchema.statics.findByCredentials = function (email, password) {
//   let User = this;
//   return User.findOne({
//       email
//     })
//     .then((user) => {
//       if (!user) {
//         return Promise.reject();
//       }

//       return new Promise((resolve, reject) => {
//         bcrypt.compare(password, user.password, (err, res) => {
//           if (res) {
//             resolve(user)
//           } else {
//             reject()
//           }
//         });
//       });
//     });
// };

// UserSchema.pre('save', function (next) {
//   let user = this;

//   if (user.isModified('password')) {
//     // user.password
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });

// const User = mongoose.model('User', UserSchema);
