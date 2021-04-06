"use strict";

const app = require('../app.js');
const wss = require('../websocket/websocket');

app.set('port', process.env.PORT||8000);

const server = app.listen(app.get('port'), ()=>{
    console.log(`${app.get('port')}포트 서버가 실행중입니다.`)
})
wss(server);
