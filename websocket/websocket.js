const WebSocket = require('ws');
const { Word } = require('../models');
module.exports = (server) => {
    const wss = new WebSocket.Server({server}); // {port: 3000}
    wss.on('connection', async(ws, req)=>{
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        ws.on('error', (error)=>{
            console.log('웹소켓 에러')
            console.error(error);
        });
        ws.on('close', () => {
            console.log('웹소켓 닫기');
        });
        if(ws.readyState === ws.OPEN){
            const words = await Word.findAll();
            ws.send(JSON.stringify(words));
        }
    });
}

