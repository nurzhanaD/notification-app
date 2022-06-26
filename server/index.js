const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const app = express();

const {Server} = require('socket.io');

const server = http.createServer(app);

app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:true}));

//socket io
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST","DELETE","PUT"]
    }
});

io.on("connection",(socket) => {
    console.log(`connected ${socket.id}`);

    socket.join(1);

    socket.on("send_notification", (data) => {
        socket.to(1).emit("receive_notification", data);
    });

    socket.on("disconnect", () => {
        console.log("disconnected", socket.id);
    });
});

//socket io

server.listen(3001,() => {
    console.log('running on port 3001');
});