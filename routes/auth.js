const router = require('express').Router();
const {
  signup,
  login,
  logout
} = require('../controllers/auth');

router.post('/users/v0/signup', signup);
router.post('/users/v0/login', login);
router.delete('/users/v0/logout', logout);

module.exports = router;