const express = require('express');
const router = express.Router();
cors = require('cors');
const coursesHandler = require('../handler/courses');

router.post('/',coursesHandler.create);
router.put('/:id',coursesHandler.update);
router.delete('/:id',coursesHandler.destroy);
router.get('/:id',coursesHandler.get);
router.get('/',coursesHandler.getAll);
module.exports = router;
