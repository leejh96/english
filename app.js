"use strict";

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const wordsRouter = require('./routes/myword');
const {sequelize} = require('./models');



require('dotenv').config();
sequelize.sync()

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/myword',wordsRouter);
app.use((req, res, next)=>{
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('서버 에러!');
});


// module.exports= app;

module.exports = app;