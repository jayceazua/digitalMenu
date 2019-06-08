const _ = require('lodash');
const {
  User
} = require('../models/user');


const {
  sendEmail
} = require('../middleware/mailgun-config');

// SIGNUP
const signup = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save().then(() => {

    return user.generateAuthToken();

  }).then((token) => {
    // send email
    sendEmail(user)

    res.header('x-auth', token).json({
      user
    })

  }).catch((e) => {
    res.status(400).send(e)
  });
}


// const signup = async (req, res) => {
//   try {
//     const email = req.body.email;
//     let user = await User.findOne({email}, "email");
//     if (user) {
//       res.status(401).send('Account with this email already exists');
//     };
//     const newUser = new User(req.body); 
//     await newUser.save();

//     const token = jwt.sign({ _id: newUser._id }, process.env.SECRET, { expiresIn: "60 days" });   
//     res.cookie('dmToken', token, { maxAge: 600000, httpOnly: true });
//     console.log("New user saved:", newUser)
//     return res.status(200).json({newUser});
//   } catch(err) {
//     res.status(401).send(err);
//   }
// }

// LOGIN
const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).json({
        user
      });
    });
  }).catch((err) => {
    res.status(400).send(err)
  });
}
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     let user = await User.findOne({email}, "firstName lastName email phoneNumber restaurants password");
//     if (!user) {
//       res.status(401).send('Wrong Email');
//     };
//     user.comparePassword(password, (err, isMatch) => {
//         if (!isMatch) {
//           res.status(401).send('Wrong Email or Password');
//         };
//         const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, { expiresIn: "60 days" });
//         res.cookie("dmToken", token, {maxAge: 900000, httpOnly:true});
//         return res.status(200).send(user);         
//     });
//   } catch (err) {
//     res.status(401).send(err);
//   }
// };

//LOGOUT
const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
}
// const logout = (req, res) => {
//   res.clearCookie('dmToken');
//   return res.status(200).send('User logged out.');
// };

module.exports = {
  signup,
  login,
  logout
}