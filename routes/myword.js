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
            const word = await Word.findAll({
                include : [{
                    model : User,
                    where : { id : req.user.id }
                }]
            });
            if(word){
                const words = {
                    number:[],
                    spelling:[],
                    meaning:[],
                    id:[],
                };
                for(let i = 0; i<10; i++){
                    words.number.push(i+1);
                    words.spelling.push(word[i].dataValues.spelling);
                    words.meaning.push(word[i].dataValues.meaning);
                    words.id.push(word[i].dataValues.id);
                }
                const totalWordsCount = word.length;
                const session = req.user;
                const pageNumber = 1;
                const data = {words, session, totalWordsCount, pageNumber}
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

router.get('/page/:pageNumber', async (req, res, next) => {
    try {
        const word = await Word.findAll({
            include : [{
                model : User,
                where : { id : req.user.id }
            }]
        });
        const words = {
            number : [],
            spelling: [],
            meaning:[],
            id:[],
        };
        const totalWordsCount = word.length;
        const session = req.user;
        const pageNumber = parseInt(req.params.pageNumber);
        let wordCount = pageNumber*10;
        if (wordCount > word.length){
            wordCount = word.length;
        }
        for(let i = (pageNumber-1)*10; i< wordCount; i++){
            words.number.push(i+1);
            words.spelling.push(word[i].dataValues.spelling);
            words.meaning.push(word[i].dataValues.meaning);
            words.id.push(word[i].dataValues.id);
        }
        const data = {words, session, totalWordsCount, pageNumber};
        res.render('myword',{data});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const { spelling, meaning } = req.body;
    try{
        const word = await Word.findOne({
            where : { spelling, meaning },
            include : [{model: User}]
        });
        if (word){
            const idArr = [];
            for(let i = 0; i<word.users.length; i++){
                idArr.push(word.users[i].id);
            }
            console.log(idArr);
            if(idArr.includes(req.user.id)){
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
router.post('/search', async (req, res, next)=>{
    const { lang, text } = req.body;
    try {
        if(lang === 'ko'){
            const word = await Word.findAll({       
                where : {
                    meaning : text
                },
                include : [{
                    model : User,
                    where : { id : req.user.id }
                }]   
            });
            if(word.length !== 0){
                res.json({
                    success : true,
                    word
                })
            }else{
                res.json({
                    success : false,
                    message : '해당하는 단어가 없습니다.'
                })
            }
        }else{
            const word = await Word.findAll({       
                where : {
                    spelling : text
                },
                include : [{
                    model : User,
                    where : { id : req.user.id }
                }]   
            });
            if(word){
                res.json({
                    success : true,
                    word
                })
            }else{
                res.json({
                    success : false,
                    message : '해당하는 단어가 없습니다.'
                })
            }
        }
    } catch (error) {
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