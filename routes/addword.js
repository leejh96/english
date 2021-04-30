"use strict";

const express = require('express');
const isLogin = require('../middleware/middleware');
const router = express.Router();
const { Category } = require('../models');
router.get('/', isLogin,async(req,res,next)=>{
    try {
        const category = await Category.findAll();
        res.render('addword', {category});

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
