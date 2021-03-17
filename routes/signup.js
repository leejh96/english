"use strict";

const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.render('signup');
});

router.post('/', async (req, res, next)=>{
    const name = req.body.name;
    const id = req.body.id;
    const password = req.body.password;    
    try {
        const user = await User.findOne({where : { loginId:id }});
        if(user){
            return res.json({
                success : false,
                message : '이미 존재하는 존재하는 아이디 입니다',
            });
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            name,
            loginId : id,
            password : hash,
        });
        return res.json({
            success : true
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

})

module.exports = router;