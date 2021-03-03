const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
require('dotenv').config();

app.set('port', process.env.PORT||8000);

app.use(logger('dev'));
app.use(express.json());
app.use(express(urlencoded({ extended: false})));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use((req, res, next)=>{
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('서버 에러!');
});
app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}포트 서버가 실행중입니다.`)
})

// module.exports= app;