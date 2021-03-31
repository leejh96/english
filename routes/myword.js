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
                res.render('myword', {words});
            }else{
                res.render('myword');
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

router.post('/', async (req, res, next) => {
    const { spelling, meaning } = req.body;
    try{
        const word = await Word.findOne({
            where : { spelling, meaning },
            include : [{model: User}]
        });
        if (word){
            if(word.users.includes(req.user.id)){
                return res.redirect('/myword');
            }else{
                await word.addUser(req.user.id);
                return res.redirect('/myword');
            }
        }else{
            const createWord = await Word.create({
                spelling,
                meaning
            });
            await createWord.addUser(req.user.id);
            return res.redirect('/myword');
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.put('/:id', async(req, res, next)=>{
    try {
        const word = await Word.update({
            spelling : req.body.spelling,
            meaning : req.body.meaning
        }, { where : {id : req.params.id} });
        res.redirect(`/myword/${req.params.id}`);
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