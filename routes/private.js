const express = require('express');
const router = express.Router();
const {getPrivateData, affilatelist} = require('../controllers/private');
const {protect} = require('../middleware/auth');

router.route('/').get(protect, getPrivateData);
router.route('/affilate/:type').get(affilatelist);

module.exports = router;