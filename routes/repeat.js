"use strict";

const express = require('express');
const router = express.Router();
const { User, Word } = require('../models');
const isLogin = require('../middleware/middleware');

router.use(isLogin);
router.get('/', async (req, res, next) => {
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
    if(!word){
        return res.json({
            success : false
        })
    }
    return res.json({
        success : true
    });
});

module.exports = router;