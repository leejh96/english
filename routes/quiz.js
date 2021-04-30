const express = require('express');
const router = express.Router();
const {Word} = require('../models');
const isLogin = require('../middleware/middleware');

router.get('/', isLogin, async(req, res, next)=>{
    const words = await Word.findAll();
    res.render('quiz', {words});
});

module.exports = router;