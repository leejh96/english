"use strict";

const express = require('express');
const router = express.Router();
const { Word, User } = require('../models/');
const user = require('../models/user');

router.get('/', async (req, res, next) =>{
    if(!req.user){
        res.redirect('/login');
    }else{
        try {
            const words = await Word.findAll({
                include : [{
                    model : User,
                    where : { id : req.user.id }
                }]
            });
            if(words){
                const session = req.user;
                const data = {words, session}
                res.render('myword', {data});
            }else{
                const session = req.user;
                const data = {session}
                res.render('myword', {data});
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
});

router.get('/:id', async(req,res,next)=>{
    try {
        const word = await Word.findOne({where : { id : req.params.id}});
        res.render('worddetail', {word});
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:id/edit', async(req, res, next)=>{
    try {
        const word = await Word.findOne({where : { id : req.params.id}});
        res.render('edit', {word});
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/log/out', (req, res, next) => {
    req.logout();//passport의 logout으로 로그아웃 구현
    //세션도 다 지워줌
    req.session.destroy(() => {
        res.redirect('/');
    });
});

router.post('/', async (req, res, next) => {
    const { spelling, meaning } = req.body;
    try{
        const word = await Word.findOne({
            where : { spelling, meaning },
            include : [{model: User}]
        });
        if (word){
            if(word.users[0].dataValues.id === req.user.id){
                return res.json({
                    success : false,
                    message : '이미 존재하는 단어입니다'
                });
            }else{
                await word.addUser(req.user.id);
                return res.json({
                    success : true
                });
            }
        }else{
            const createWord = await Word.create({
                spelling,
                meaning
            });
            await createWord.addUser(req.user.id);
            return res.json({
                success : true
            });
        }
    }catch(error){
        console.error(error);
        next(error);
    }
});

router.put('/:id', async(req, res, next)=>{
    try {
        const word = await Word.update({
            spelling : req.body.spelling,
            meaning : req.body.meaning
        }, { where : {id : req.params.id} });
        if(word){
            res.json({
                success : true
            });
        }else{
            res.json({
                success : false
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }

});

router.delete('/:id', (req, res, next)=>{
    try {
        Word.destroy({ where : {id : req.params.id} });
        res.redirect('/myword');
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;