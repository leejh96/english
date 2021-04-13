const express = require('express');
const router = express.Router();
const {Word} = require('../models');

router.get('/', async(req, res, next)=>{
    if (!req.user){
        return res.redirect('/login');
    }
    const words = await Word.findAll();
    res.render('quiz', {words});
});

module.exports = router;