// Express
const express = require('express');

// Router
const router = express.Router();

// Models
const Claim = require('../models/Claim');

// Middleware
const filtering = require('../middleware/filtering');
// const multer = require('multer');

// Controllers
const { getClaims, sendClaim } = require('../controllers/claims');
// const upload = multer({ dest: 'uploads/' });

// Routes
router.route('/send').post(sendClaim);
router.route('/').get(filtering(Claim), getClaims);

module.exports = router;
