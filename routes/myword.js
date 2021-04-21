"use strict";

const express = require('express');
const router = express.Router();
const { Word, User, Category, Op } = require('../models/');

router.get('/page/:pageNumber', async (req, res, next) => {
    try {
        if(!req.user){
            return res.redirect('/login')
        }
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

router.get('/:id', async(req, res, next)=>{
    try {
        if(!req.user){
            return res.redirect('/login')
        }
        const word = await Word.findOne({
            where : {
                id: req.params.id
            },
            include:[{
                model : Category
            }]
        });
        const similarWords = await Word.findAll({
            where: {
                meaning : {
                    [Op.like]: `%${word.meaning.substring(0,2)}%`
                }
            }
        });
        const categoryArr = []
        let similarCategory = {}
        if(word.categories.length > 1){
            for(let i = 0; i< word.categories.length; i++){
                categoryArr.push(word.categories[i].id);
            }
            similarCategory = await Word.findAll({
                where : { id : {[Op.ne] : word.id}},
                include : [{
                    model : Category,
                    where : {
                        [ Op.in ] : [{id : categoryArr }],
                    }
                }]
            })
        }else{
            similarCategory = await Word.findAll({
                where : { id : {[Op.ne] : word.id}},
                include : [{
                    model : Category,
                    where : { id : word.categories[0].id}
                }]
            })
        }
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
        const word = await Word.findOne({
            where : { id : req.params.id},
            include : [{
                model : User
            },{
                model : Category
            }]
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
            console.log(idArr);
            if(idArr.includes(req.user.id)){
                return res.json({
                    success : false,
                    message : '이미 존재하는 단어입니다'
                });
            }else{
                await word.addUser(req.user.id);
                // await word.addCategory(category);
                return res.json({
                    success : true,
                });
            }
        }else{
            const createWord = await Word.create({
                spelling,
                meaning
            });
            await createWord.addUser(req.user.id);
            // await createWord.addCategory(category);
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
            meaning : req.body.meaning,
            category : req.body.category
        }, { 
            where : {id : req.params.id},
            include : [{
                model : User,
                where : {id : req.user.id}
            }]
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
        Word.destroy({ where : {id : req.params.id} });
        return res.redirect(`/myword/page/1`);
    } catch (error) {
        console.error(error);
        next(error);
    }
});
module.exports = router;