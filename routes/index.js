"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next)=>{
    const session = req.user;
    res.render('index', {session});
});

router.get('/logout', (req, res, next) => {
    req.logout();//passport의 logout으로 로그아웃 구현
    //세션도 다 지워줌
    req.session.destroy(() => {
        res.redirect('/');
    });
});


module.exports = router;
