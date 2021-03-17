"use strict";

const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', async (req, res,next)=>{
    const id = req.body.id;
    const password = req.body.password;
    User.findOne({ where : { loginId : id }})
    .then((user) => {
        //bcrypt로 암호화된 값 비교
        if (!bcrypt.compareSync( password ,user.password )) {
            return res.json({
                success : false,
                message : '로그인에 실패하셨습니다.'
            });
        }
        return res.json({
            success : true
        });
    })
    .catch((err)=>{
        console.error(err);
    })  
    
});

module.exports = router;