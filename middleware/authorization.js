const {
  User
} = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  let token = req.cookies.dmToken;

  if (!token) {
    return res.status(401).send("Where is the token?");
  } else {
    // verify a token symmetric - synchronous
    let userId = jwt.verify(token, process.env.SECRET)._id;

    User.findById(userId)
      .then((user) => {
        if (!user) {
          // return something better than a promise reject.
          return Promise.reject()
        }


        // console.log("I am here with the user:", user)
        req.user = user
        next();
      })
      .catch((err) => {
        res.status(401).send(err);
      })
  }

  // parse the cookie everything from nToken={everything after the equal sign}
  // decode the jwt
  // in the payload get the user id and findById
  // if no user is found return error kick the mf out
  // else return success to the next
}

// (req, res, next) => {
//   let token = req.header('dmToken');
//   let token = req.cookies
//   User.findByToken(token)
//     .then((user) => {
//       if (!user) {

//         return Promise.reject();

//       }
//       req.user = user;
//       req.token = token;
//       next();
//     })
//     .catch((err) => {
//       res.status(401).send("User not logged in");
//     });
// }

module.exports = {
  authenticate
}