"use strict";

const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', (req, res,next)=>{
    const id = req.body.loginId;
    const password = req.body.loginPassword;
    console.log(req.body);
    User.findOne({ where : { loginId : id }})
    .then((user) => {
        if (user.loginId !== id || user.password !== password) {
            return res.redirect('/login');
        }
        return res.redirect('/');
    })
    .catch((err)=>{
        console.error(err);
    })  
    
});

module.exports = router;