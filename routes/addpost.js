"use strict";

const express = require('express');
const router = express.Router();
router.get('/', (req,res,next)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    res.render('addpost');
});

module.exports = router;
