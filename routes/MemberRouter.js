const express = require('express');
const router = express.Router();
const MemberController = require('../controllers/MemberController');

router.post(
	'/processAdd/',
	MemberController.processAdd
);

router.put(
	'/processEdit/:id',
	MemberController.processUpdate
);
module.exports = router;
