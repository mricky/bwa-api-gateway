var express = require('express');
var router = express.Router();
var cors = require('cors')

const {APP_NAME } = process.env;
const axios = require('axios').default;
/* GET orders listing. */
router.get('/', async function(req, res, next) {


   try {
      await axios.get('https://google.com');
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleAxiosError(error);
      } else {
        handleUnexpectedError(error);
      }
    }

});

module.exports = router;
