"use strict";

const express = require('express');
const router = express.Router();
const { User, Word } = require('../models');

router.get('/', async (req, res, next) => {
    const words = await Word.findAll({
        include : [{
            model : User,
            where : { id : req.user.id }
        }]
    });
    res.render('repeat', {words});
});

module.exports = router;