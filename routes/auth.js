const router = require('express').Router();
const {auth} = require('../middleware/authorization');
const {
  signup,
  login,
  logout
} = require('../controllers/auth');

router.post('/users/v0/signup', signup);
router.post('/users/v0/login', login);
router.delete('/users/v0/logout', auth, logout);

module.exports = router;