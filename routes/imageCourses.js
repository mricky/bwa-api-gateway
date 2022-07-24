const express = require('express');
const router = express.Router();
cors = require('cors');
const imageCoursesHandler = require('../handler/image-courses');

router.post('/',imageCoursesHandler.create);
router.put('/:id',imageCoursesHandler.update);
router.delete('/:id',imageCoursesHandler.destroy);
// router.get('/:id',lessonsHandler.get);
// router.get('/',lessonsHandler.getAll);
module.exports = router;
