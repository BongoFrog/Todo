const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post('/register', authController.register);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post('/login', authController.login);

// @route    GET api/auth
// @desc     Get logged in user
// @access   Private
router.get('/', authMiddleware, (req, res) => {
  res.send('User info');
});

module.exports = router;
