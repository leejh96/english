const { urlencoded } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
require('dotenv').config();

const indexRouter = require('./routes/index')
// const {sequelize} = require('./models');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('port', process.env.PORT||8000);
// app.use(logger('dev'));
app.use(logger('dev'));
app.use(express.json());
app.use(express(urlencoded({ extended: false})));
app.use('/', indexRouter);
// app.use('/login', loginRouter);

app.use((req, res, next)=>{
    res.status(404).send('NOT FOUND');
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}포트 서버가 실행중입니다.`)
})

// module.exports= app;