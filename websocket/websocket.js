const WebSocket = require('ws');
const { Word } = require('../models');
module.exports = (server) => {
    const wss = new WebSocket.Server({server}); // {port: 3000}
    wss.on('connection', async(ws, req)=>{
        try {
            ws.on('error', (error)=>{
                console.error(error);
            });
            if(ws.readyState === ws.OPEN){
                const words = await Word.findAll();
                ws.send(JSON.stringify(words));
            }
        } catch (error) {
            console.error(error);
        }

    });
}

