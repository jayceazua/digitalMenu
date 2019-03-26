/**
 * Created by: Jayce Azua
 * Date: 03/22/2019 
 */
const _ = require('lodash');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const { sendEmail } = require('../middleware/mailgun-config');

// CREATE / SIGNUP
/** Sign up users/ register them */
const signup = (req, res) => {
  const user = new User(req.body);

  user.save().then((user) => {

    // Generates a token
    var token = jwt.sign({
      _id: user._id
    }, process.env.SECRET, {
      expiresIn: "60 days"
    });

    // Set token as a cookie
    res.cookie('nToken', token, {
      maxAge: 900000,
      httpOnly: true
    });
    res.status(200).send(user);
    res.redirect(301, '/');
  }).catch(err => res.json(err));
}

// LOGIN
/** have users login <- don't worry about this */
const login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  // Find this user name
  User.findOne({email}, "fullname email position password")
    .then((user) => {
      console.log("user:", user);
      
      if (!user) {
        // User not found
        return res.status(401).json("Wrong Username or Password");
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
        res.cookie("nToken", token, {
          maxAge: 900000,
          httpOnly: true
        });

        res.status(200).send({user});
        // res.json("Successfully logged in.")

      });

    }).catch((err) => {
      console.log(err);
    });
};

//LOGOUT
/** have users logout <- don't worry about this */
const logout = (req, res) => {
  res.clearCookie('nToken');
  res.redirect('http://localhost:3000/')
};

module.exports = {
  signup,
  login,
  logout
}