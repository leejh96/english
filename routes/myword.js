const express = require('express');
const router = express.Router();
const {Word} = require('../models/');
router.get('/', async (req, res, next) =>{
    try {
        const words = await Word.findAll();
        console.log(words);
        console.log(words[1].dataValues.spelling);

        res.render('myword', {words});
    } catch (error) {
        console.error(error);
        next(error);
    }
    
});



router.post('/', async (req, res, next) => {
    const { spelling, meaning } = req.body;
    console.log(req.body);
    try{
        const word = await Word.findOne({where : { spelling }})
        console.log(word);
        if (word){
            if (word.spelling === spelling){
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

module.exports = router;