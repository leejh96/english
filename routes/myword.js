"use strict";

const express = require('express');
const router = express.Router();
const {Word} = require('../models/');

router.get('/', async (req, res, next) =>{
    try {
        const words = await Word.findAll();
        if(words){
            res.render('myword', {words});
        }else{
            res.render('myword');
        }
    } catch (error) {
        console.error(error);
        next(error);
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

router.get('/:id/edit', async(req,res,next)=>{
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
    console.log(req.body);
    try{
        const word = await Word.findOne({where : { spelling }})
        if (word){
            if (word.meaning === meaning){
                return res.redirect('/myword');
            }else{
                Word.create({
                    spelling,
                    meaning
                })
                return res.redirect('/myword');
            }
        }
        Word.create({
            spelling,
            meaning
        })
        return res.redirect('/myword');
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