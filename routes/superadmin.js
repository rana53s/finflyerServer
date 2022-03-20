const express = require('express');

const router = express.Router();

const {affilate} = require('../controllers/superadmin');

router.route('/affilate').post(affilate);



module.exports = router;