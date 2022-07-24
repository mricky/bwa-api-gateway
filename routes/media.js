const express = require('express');
const router = express.Router();
cors = require('cors');
const mediaHandler = require('../handler/media');
const verifyToken = require('../middlewares/verifyToken');

router.post('/',mediaHandler.create);
router.get('/',verifyToken,mediaHandler.getAll);
router.delete('/:id',mediaHandler.destroy);
// /* GET media listing. */
// router.post('/', function(req, res, next) {
//   res.send('media');
// });

/* before move to handle media

*/

module.exports = router;
