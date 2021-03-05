"use strict";

const app = require('../app.js');

app.set('port', process.env.PORT||8000);

app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}포트 서버가 실행중입니다.`)
})