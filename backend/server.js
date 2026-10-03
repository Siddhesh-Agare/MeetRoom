import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import meetingRouter from './src/Routes/meetingRoutes.js';

const app = express();
const server = http.createServer(app);
app.use(cors())
app.use(express.json())


const PORT = 5000;

app.get("/", (req,res)=>{
    res.send("Meeting room is running ")
})

app.use("/api",meetingRouter)


const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})