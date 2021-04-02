"use strict";

const express = require('express');
const router = express.Router();
const { User, Word } = require('../models');

router.get('/', async (req, res, next) => {
    if(!req.user){
        return res.redirect('/login');
    }
    const words = await Word.findAll({
        include : [{
            model : User,
            where : { id : req.user.id }
        }]
    });
    res.render('repeat', {words});
});

router.post('/', async (req, res, next)=> {
    const word = await Word.findOne({where : {
        spelling : req.body.spelling,
        meaning : req.body.meaning
    }})
    console.log(word);
    if(!word){
        return res.json({
            success : false
        })
    }
    return res.json({
        success : true
    });
});

router.put('/', (req, res, next)=>{
    return res.redirect('/repeat');
});

module.exports = router;