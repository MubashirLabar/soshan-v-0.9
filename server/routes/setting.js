const express = require("express");
const router = express.Router();
const { modifysettings,getsettings,getshopstatus } = require("../controllers/setting");

// vendor and admin side
router.post('/modifysettings',modifysettings)
router.get('/getsettings',getsettings)
router.get('/getshopstatus',getshopstatus)

module.exports = router;
