"use strict";
const express = require('express');
const router = express.Router();
const { User, Board } = require('../models');
const isLogin = require('../middleware/middleware');
const bcrypt = require('bcrypt');
router.use(isLogin);
router.get('/', async(req, res, next)=> {
    const user = await User.findOne({where : {
        id : req.user.id
    }})
    res.render('setting' , {user});
});

router.put('/nick', async(req, res, next)=>{
    try {
        await User.update(
            {nick : req.body.nick},
            {where : { id : req.user.id}
        });
        return res.json({
            success : true
        })
    } catch (error) {
        console.error(error);
        next(error);
    }


});

router.put('/password', async(req, res, next)=>{
    try {
        const user = await User.findOne({where : { id : req.user.id}});
        if(user){
            const result = await bcrypt.compare( req.body.currentPassword, user.password )
            if (result){
                const hash = await bcrypt.hash(req.body.password, 12);
                await User.update({password : hash}, { where : { id : req.user.id}});
                return res.json({
                    success : true
                })
            }else{
                return res.json({
                        message : '비밀번호가 틀립니다',
                        success : false
                });
            }
        }else{
            return res.json({
                success : false,
                message : '부적절한 접근으로 아이디는 로그아웃 됩니다'
            })
        }
    } catch (error) {
        console.error(error);
        return done(error);
    }
});

router.delete('/signout', async(req, res, next)=>{
    const user = await User.findOne({where : {id : req.user.id}});
    const result = await bcrypt.compare(req.body.password, user.password)
    if(result){
        await Board.update({author : '알수없음'},{where : { userId : req.user.id}});
        await user.destroy({where : {id : req.user.id}});
        return res.json({
            success : true
        });
    }else{
        return res.json({
            success : false,
            message : '비밀번호가 틀렸습니다'
        });
    }
});
module.exports = router;