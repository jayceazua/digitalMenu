const _ = require('lodash');
const {
  User
} = require('../models/user');
const jwt = require('jsonwebtoken');

// const { sendEmail } = require('../middleware/mailgun-config');

const signup = async (req, res) => {
  try {
    const email = req.body.email;
    let user = await User.findOne({
      email
    }, "email");
    if (user) {
      res.status(401).send('Account with this email already exists');
    };
    const newUser = new User(req.body);
    await newUser.save();

    const token = jwt.sign({
      _id: newUser._id
    }, process.env.SECRET, {
      expiresIn: "60 days"
    });

    res.cookie('dmToken', token, {
      maxAge: 600000,
      httpOnly: true
    });
    console.log("New user saved:", )
    return res.status(200).json({
      token
    });
  } catch (err) {
    res.status(401).send(err);
  }
}

const login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    let user = await User.findOne({
      email
    }, "firstName lastName email phoneNumber restaurants password");
    if (!user) {
      res.status(401).send('Wrong Email');
    };
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
        res.status(401).send('Wrong Email or Password');
      };
      const token = jwt.sign({
        _id: user._id,
        username: user.username
      }, process.env.SECRET, {
        expiresIn: "60 days"
      });
      res.cookie("dmToken", token, {
        maxAge: 900000,
        httpOnly: true
      });
      return res.status(200).send(user);
    });
  } catch (err) {
    res.status(401).send(err);
  }
};

//LOGOUT
/** have users logout <- don't worry about this */
const logout = (req, res) => {
  res.clearCookie('dmToken');
  return res.status(200).send('User logged out.');
};

module.exports = {
  signup,
  login,
  logout
}