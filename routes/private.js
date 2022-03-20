const express = require('express');
const router = express.Router();
const {getPrivateData, affilatelist, workentry, worklist} = require('../controllers/private');
const {protect} = require('../middleware/auth');

router.route('/').get(protect, getPrivateData);
router.route('/affilate/:type').get(affilatelist);
router.route('/workentry').post(workentry);
router.route('/worklist').post(worklist);


module.exports = router;