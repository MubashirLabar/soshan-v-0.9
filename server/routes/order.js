const express = require("express");
const router = express.Router();
const { createorder,execute,checkcode,getdashboardinfo,getallorders,orderstatus } = require("../controllers/order");
const protect = require('../middleware/protect')
// vendor and admin side
router.post('/createorder',createorder)
router.post('/execute',execute)
router.post('/checkcode',checkcode)
router.get('/getdashboardinfo',protect,getdashboardinfo)
router.get('/getallorders',getallorders)
router.get('/orderstatus/:id',orderstatus)

module.exports = router;
