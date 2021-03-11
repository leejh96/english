const express = require('express');
const router = express.Router();
const { Word } = require('../models');

router.get('/', (req, res, next) =>{
    res.render('words');
});

router.post('/', async (req, res, next) => {
    const { spelling, meaning } = req.body;
    console.log(req.body);
    try{
        const word = await Word.findOne({where : { spelling }})
        console.log(word);
        if (word){
            if (word.spelling === spelling){
                return res.redirect('/words');
            }else{
                Word.create({
                    spelling,
                    meaning
                })
                return res.redirect('/words');
            }
        }
        Word.create({
            spelling,
            meaning
        })
        return res.redirect('/words');
    }catch(err){
        console.error(err);
        next(err);
    }

});

module.exports = router;