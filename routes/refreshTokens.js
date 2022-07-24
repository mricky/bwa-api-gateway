const express = require('express');
const router = express.Router();
cors = require('cors');
const refreshTokenHandler = require('../handler/refresh-tokens');


router.post('/',refreshTokenHandler.refreshToken);


module.exports = router;
