"use strict";

const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('login');
});

//passport 없이 구현
// router.post('/', async (req, res,next)=>{
//     const id = req.body.id;
//     const password = req.body.password;
//     User.findOne({ where : { loginId : id }})
//     .then((user) => {
//         //bcrypt로 암호화된 값 비교
//         if (!bcrypt.compareSync( password ,user.password )) {
//             return res.json({
//                 success : false,
//                 message : '로그인에 실패하셨습니다.'
//             });
//         }
//         return res.json({
//             success : true
//         });
//     })
//     .catch((err)=>{
//         console.error(err);
//     })  
    
// });

router.post('/', (req, res, next) => {
    //local은 어떠한 전략으로 로그인 하겠는가를 지정
    passport.authenticate('local', (err, user, fail)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(!user){
            return res.redirect('/login');
        }
        // //login은 passport가 추가해주는 것
        // //이렇게 되면 user의 데이터가 session에 저장되고 앞으로 
        // //req.user로 사용자의 정보를 가져올수 있게 된다.
        return req.login(user, (loginError)=> {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});
module.exports = router;