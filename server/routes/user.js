const express = require("express");
const router = express.Router();
const { createuser,loginuser,checkuser,changepassword } = require("../controllers/user");
const protect = require('../middleware/protect')

// vendor and admin side
//router.post('/createuser',createuser)
router.post('/loginuser',loginuser)
router.get('/checkuser',protect,checkuser)
router.post('/changepassowrd',protect,changepassword)

module.exports = router;
