const express = require('express');
const router = express.Router();
cors = require('cors');
const myCoursesHandler = require('../handler/my-courses');

router.post('/',myCoursesHandler.create);
router.get('/',myCoursesHandler.get);
module.exports = router;
