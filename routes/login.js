"use strict";

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

router.post('/', (req, res, next) => {
    //local은 어떠한 전략으로 로그인 하겠는가를 지정
    passport.authenticate('local', (err, user, fail)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(!user){
            return res.json({
                success : fail.success,
                message : fail.message
            });
        }
        //login은 passport가 추가해주는 것
        //이렇게 되면 user의 데이터가 session에 저장되고 앞으로 
        //req.user로 사용자의 정보를 가져올수 있게 된다.
        return req.login(user, (loginError)=> {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.json({
                success : true
            });
        });
    })(req, res, next);
});
module.exports = router;