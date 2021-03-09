"use strict";

const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('signup');
});

router.post('/', async (req, res, next)=>{
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;
    const existId = await User.findOne({ where : { loginId : id }})
    if (existId){
        return res.json({
            success : false,
            message : "이미 존재하는 아이디 입니다."
        })
    }
    const existPassword = await User.findOne({where : {password}});
    console.log(existPassword);
    if (existPassword){
        return res.json({
            success : false,
            message : "이미 존재하는 비밀번호 입니다."
        })
    }
    User.create({
        name,
        loginId : id,
        password,
    });
    return res.json({
        success : true
    })
})

module.exports = router;