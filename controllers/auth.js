const jwt = require('jsonwebtoken');
const {
  User
} = require('../models/user');


const {
  sendEmail
} = require('../middleware/mailgun-config');

// SIGNUP
// CREATE / SIGNUP
/** Sign up users/ register them */
const signup = (req, res) => {
  const user = new User(req.body);

  user.save().then((user) => {
    var token = jwt.sign({
      _id: user._id
    }, process.env.SECRET, {
      expiresIn: "60 days"
    });
    res.cookie('dmToken', token, {
      maxAge: 900000,
      httpOnly: true
    });

    // send email
    // sendEmail(user)


    return res.status(200).send(user)
    // return res.redirect(200, '/dashboard')
  }).catch(err => res.json(err))
}


// const signup = (req, res) => {
//   // let body = _.pick(req.body, ['firstName', 'lastName', 'email', 'phoneNumber', 'position', 'password']);
//   let user = new User(req.body);

//   user.save().then(() => {

//     return user.generateAuthToken();

//   }).then((token) => {
//     // send email
//     sendEmail(user)

//     res.header('dmToken', token)
//     // Save the access token in a cookie -> every 3 months to refresh
//     res.cookie('dmToken', token, {
//       maxAge: 3628800000,
//       httpOnly: true
//     });

//     return res.status(200).send(user)
//   }).catch((err) => {
//     res.status(400).send(err)
//   });
// }

// LOGIN
const login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find this user name
  User.findOne({
      email
    }, "username password")
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({
          message: "Wrong Username or Password"
        });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({
            message: "Wrong Username or password"
          });
        }
        // Create a token
        const token = jwt.sign({
          _id: user._id,
          email: user.email
        }, process.env.SECRET, {
          expiresIn: "60 days"
        });
        // Set a cookie and redirect to root
        res.cookie("dmToken", token, {
          maxAge: 900000,
          httpOnly: true
        });

        return res.status(200).send(user)
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// (req, res) => {
//   let body = _.pick(req.body, ['email', 'password']);

//   User.findByCredentials(body.email, body.password).then((user) => {
//     return user.generateAuthToken().then((token) => {
//       res.header('dmToken', token)
//       // Save the access token in a cookie -> every 3 months to refresh
//       res.cookie('dmToken', token, {
//         maxAge: 3628800000,
//         httpOnly: true
//       });

//       return res.status(200).send(user)
//     });
//   }).catch((err) => {
//     res.status(400).send(err)
//   });
// }


//LOGOUT
const logout = (req, res) => {
  res.clearCookie('dmToken');
  res.json({
    "User": "Successfully logged out."
  });
};

// (req, res) => {
//   req.user.removeToken(req.token).then(() => {
//     res.status(200).send('User logged out.')
//   }).catch((err) => {
//     res.status(400).send(err)
//   })
// }


module.exports = {
  signup,
  login,
  logout
}