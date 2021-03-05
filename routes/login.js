"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');

const user = {
    id : ['123', '456', '789'],
    passward : ['123', '456', '789']
}

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', (req, res,next)=>{
    const id = req.body.id;
    const password = req.body.password;
    if (user.id.includes(id)){
        const idx = user.id.indexOf(id);
        if(user.passward[idx] === password ){
            return res.json({
                success : true,
                message : '로그인의 성공하셨습니다.'
            });
        }
    }
    return res.json({
        success : false,
        message : '로그인에 실패하셨습니다.'
    });
});
module.exports = router;