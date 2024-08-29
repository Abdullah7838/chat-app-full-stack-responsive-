const express = require('express');
const router = express.Router();
const { SignupHandler,LoginHandler } = require('../controller/user'); 

router.route('/signup').post(SignupHandler);
router.route('/login').post(LoginHandler);
module.exports = router;