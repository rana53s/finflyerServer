const express = require('express');
const router = express.Router();
const {getPrivateData, affilatelist, workentry, worklist} = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateData);
router.route('/affilate/:type').get(protect, affilatelist);
router.route('/workentry').post(protect, workentry);
router.route('/worklist').post(protect, worklist);

module.exports = router;