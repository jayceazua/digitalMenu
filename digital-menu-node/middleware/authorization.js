const {
  User
} = require('../models/user');

const authenticate = (req, res, next) => {

  let token = req.header('x-token');

  User.findByToken(token)
    .then((user) => {
      if (!user) {

        return Promise.reject();

      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch((err) => {
      res.status(401).send("User not logged in");
    });
}

// (req, res, next) => {
//   let token = req;
//   console.log("this is the token", token)
//   if (!token) {
//     return res.status(401).send("Where is the token?");
//   } else {
//     let cookieToken = token.split("=")[1]
//     // verify a token symmetric - synchronous
//     let userId = jwt.verify(cookieToken, process.env.SECRET)._id;

//     User.findById(userId)
//       .then((user) => {
//         if (!user) {
//           console.log("this does not make sense")
//           // return something better than a promise reject.
//           return Promise.reject()
//         }

//         // res.send(user);
//         console.log("In here!! Yay?")
//         // console.log("I am here with the user:", user)
//         req.user = user
//         next();
//       })
//       .catch((err) => {
//         console.log(err)
//         res.status(401).send();
//       })
//   }

// parse the cookie everything from nToken={everything after the equal sign}
// decode the jwt
// in the payload get the user id and findById
// if no user is found return error kick the mf out
// else return success to the next
// }



module.exports = {
  authenticate
}