const WebSocket = require("ws");

socket=(server)=>{
    const wss = new WebSocket.Server({server:server});
wss.on("connection", (ws, req)=>{
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속" + ip);
// 클라이언트 접속 시 발동   
    ws.on("message", message => {
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(message); //열려있는 클라이언트들에게 전송

            }
        })
    })
    ws.on("close", ()=>{
        console.log("클라이언트 접속 종료:"+ip);
    })
    ws.on("error",(error)=>{
        console.log(error);
    })

})

}

module.exports = socket;