const express = require('express');
const router = express.Router();
const { WorldChatHandler,WorldChatGetHandler } = require('../controller/WorldChat'); 

router.route('/world').post(WorldChatHandler);
router.route('/world').get(WorldChatGetHandler);
module.exports = router;