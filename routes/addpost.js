"use strict";

const express = require('express');
const isLogin = require('../middleware/middleware');
const router = express.Router();
router.get('/', isLogin, (req,res,next)=>{
    res.render('addpost');
});

module.exports = router;
