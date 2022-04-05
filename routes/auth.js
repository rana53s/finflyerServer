const express = require('express');

const router = express.Router();

const { register, login, forgetpassword, resetpassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/register').post(protect, register);

router.route('/login').post(login);

router.route('/forgetpassword').post(forgetpassword);

router.route('/resetpassword/:resetToken').put(resetpassword);

module.exports = router;