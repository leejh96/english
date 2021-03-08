"use strict";

const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', (req, res,next)=>{
    console.log(User);
    const id = req.body.id;
    const password = req.body.password;
    User.findOne({ where : { loginId : id}})
    .then(user => {
        if (user.loginId === id){
            if(user.password === password){
                return res.json({
                    success : true
                })
            }
        }
        return res.json({
            success : false
        })
    })
})

module.exports = router;