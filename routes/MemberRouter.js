const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post(
	'/processAdd/',
	MemberController.processAdd
);
module.exports = router;
