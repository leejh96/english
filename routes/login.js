"use strict";

const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', (req, res,next)=>{
    console.log(req.body);
    const id = req.body.loginId;
    const password = req.body.password;
    try {
        if(!id){
            let message = "아이디를 입력하세요";
            res.send(`<script>alert('${message}');</script>`);
            return res.redirect('/');
        }else if(!password){
            let message = "비밀번호를 입력하세요";
            res.send(`<script>alert('${message}');</script>`);
            return res.redirect('/login');
        }else{
            User.findOne({ where : { loginId : id}})
            .then(user => {
                if (user.loginId === id){
                    if(user.password === password){
                        return res.redirect('/');
                    }
                }
                let message = "아이디나 비밀번호를 확인하세요";
                res.send(`<script>alert('${message}');</script>`);
                return res.redirect('/login');
            })
        }
    } catch (error) {
        console.error(error);
        next(error);
    }

})

module.exports = router;