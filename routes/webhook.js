const express = require('express');
const router = express.Router();
cors = require('cors');
const webhookHandler = require('../handler/webhook');

router.post('/',webhookHandler.webhook);

module.exports = router;
