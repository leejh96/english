"use strict";

const express = require('express');
const router = express.Router();
const { Word, User, Category, Op, UserWord } = require('../models/');

router.get('/page/:pageNumber', async (req, res, next) => {
    try {
        if(!req.user){
            return res.redirect('/login')
        }
        const word = await UserWord.findAll({
            where : {
                userId : req.user.id
            }
        });
        const words = {
            number : [],
            spelling : [],
            meaning : [],
            id : [],
        };
        const session = req.user;
        const pageNumber = parseInt(req.params.pageNumber);
        let wordCount = pageNumber*10;
        if (wordCount > word.length){
            wordCount = word.length;
        }
        for(let i = (pageNumber-1)*10; i< wordCount; i++){
            words.number.push(i+1);
            words.spelling.push(word[i].updateSpelling);
            words.meaning.push(word[i].updateMeaning);
            words.id.push(word[i].wordId);
        }
        const totalWordsCount = word.length;
        res.render('myword',{session, words, totalWordsCount});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id', async(req, res, next)=>{
    try {
        if(!req.user){
            return res.redirect('/login')
        }
        const word = await UserWord.findOne({
            where : {
                wordId: req.params.id,
                userId: req.user.id
            }
        });
        const similarWords = await Word.findAll({
            where: {
                spelling : {
                    [Op.like]: `%${word.updateSpelling.substring(0,parseInt(word.updateSpelling.length/2)+1).replace(" ","").toLowerCase()}%`
                }
            }
        });
        const similarCategory = await UserWord.findAll({
            where : {
                category : word.category
            }
        });
        res.render('worddetail', {word, similarWords, similarCategory});
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/:id/edit', async(req, res, next)=>{
    try {
        if(!req.user){
            return res.redirect('/login')
        }
        const word = await UserWord.findOne({
            where : { 
                userId : req.user.id,
                wordId : req.params.id
            }
        });
        const category = await Category.findAll();
        res.render('edit', {word, category});
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
    const { spelling, meaning, category } = req.body;
    try{
        const word = await Word.findOne({
            where : { spelling, meaning },
            include : [{ model:  User }]
        });
        if (word){
            const idArr = [];
            for(let i = 0; i<word.users.length; i++){
                idArr.push(word.users[i].id);
            }
            if(idArr.includes(req.user.id)){
                return res.json({
                    success : false,
                    message : '이미 존재하는 단어입니다'
                });
            }else{
                await word.addUser(req.user.id,
                    {
                        through: {
                            category,
                            updateSpelling : spelling,
                            updateMeaning : meaning              
                        }
                    }
                );
                return res.json({
                    success : true,
                });
            }
        }else{
            const createWord = await Word.create({
                spelling,
                meaning
            });
            await createWord.addUser(req.user.id,
                {
                    through: {
                        category,
                        updateSpelling : spelling,
                        updateMeaning : meaning              
                    }
                }
            );
            return res.json({
                success : true,
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
            const word = await UserWord.findAll({       
                where : {
                    updateMeaning : text,
                    userId : req.user.id,
                }, 
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
            const word = await UserWord.findAll({       
                where : {
                    updateSpelling : text,
                    userId : req.user.id,
                }, 
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
        const word = await UserWord.update({
            updateSpelling : req.body.spelling,
            updateMeaning : req.body.meaning,
            category : req.body.category
        }, { 
            where : {wordId : req.params.id},
        });
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
        UserWord.destroy({ where : 
            { wordId : req.params.id,
             userId : req.user.id } 
        });
        return res.redirect(`/myword/page/1`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;