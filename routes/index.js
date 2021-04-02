"use strict";

const express = require('express');
const router = express.Router();
const { Board, Word } = require('../models');

router.get('/', async(req, res, next)=>{
    const post = await Board.findAll();
    const words = await Word.findAll();
    const session = req.user;
    const data = {post, session, words};
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
