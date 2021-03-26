"use strict";

const express = require('express');
const router = express.Router();
const { Board } = require('../models');

router.get('/', async(req, res, next)=>{
    const post = await Board.findAll();
    const session = req.user;
    const data = {post, session}
    if (session){
        console.log(session.name)
    }
    res.render('index', {data});
});

router.get('/logout', (req, res, next) => {
    req.logout();//passport의 logout으로 로그아웃 구현
    //세션도 다 지워줌
    req.session.destroy(() => {
        res.redirect('/');
    });
});


module.exports = router;
