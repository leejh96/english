const express = require('express');
const app = express();
require('dotenv').config();
// const {sequelize} = require('./models');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
app.set('port', process.env.PORT||8000);
// app.use(logger('dev'));
app.get('/', (req, res)=>{
    res.send('hello node');
});

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}포트 서버가 실행중입니다.`)
})

// module.exports= app;