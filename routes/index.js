"use strict";

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next)=>{
    console.log(req.user);
    res.render('index');
})

// router.get('/:id', (req, res, next) => {
//     res.render('index', {id : req.params.id})
// })
module.exports = router;
