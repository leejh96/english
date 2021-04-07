"use strict";

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const mywordRouter = require('./routes/myword');
const addwordRouter = require('./routes/addword');
const boardRouter = require('./routes/board');
const addpostRouter = require('./routes/addpost');
const repeatRouter = require('./routes/repeat');
const translateRouter = require('./routes/translate');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const {sequelize} = require('./models');
const passportConfig = require('./passport/index');

require('dotenv').config();
sequelize.sync()

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//req.session 를 사용할 수 있도록 함
//기본적으로 세션은 메모리에 저장되기 때문에 서버를 재가동 시키면 데이터가 날아간다.
app.use(session({
    resave : false, //session 데이터가 바뀌기 전까지는 재저장 하지않는다. false로 둘 것
    saveUninitialized: true, //세션이 필요하기 전까지는 세션을 사용하지 않는다. true로 둘 것
    secret: 'SecretCode', //세션을 암호화 하기위한 비밀코드로 외부에 노출되면 안된다.
}));
app.use(flash());
app.use(passport.initialize());//passport 초기화
app.use(passport.session());//passport와 session 을 연결
passportConfig(passport);

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/myword',mywordRouter);
app.use('/addword',addwordRouter);
app.use('/board',boardRouter);
app.use('/addpost',addpostRouter);
app.use('/repeat', repeatRouter);
app.use('/translate', translateRouter);

app.use((req, res, next)=>{
    res.status(404).send('요청하신 페이지를 찾을 수 없습니다.');
})
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('서버 에러!');
});

module.exports = app;