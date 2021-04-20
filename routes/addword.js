"use strict";

const express = require('express');
const router = express.Router();
const { Category } = require('../models');
router.get('/', async(req,res,next)=>{
    if(!req.user){
        res.redirect('/login');
    }
    try {
        const category = await Category.findAll();
        res.render('addword', {category});

    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
