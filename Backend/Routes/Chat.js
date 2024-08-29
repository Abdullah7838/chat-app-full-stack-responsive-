const express = require('express');
const router = express.Router();
const { messageSendHandler} = require('../controller/Chat'); 

router.route('/chat/send').post(messageSendHandler);
// router.route('/login').post(message);
module.exports = router;