import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import meetingRouter from './src/Routes/meetingRoutes.js';
import { log } from 'console';

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

    socket.on("join-meeting",({ meetingId, name })=>{
        console.log(`${name} wants to join meeting: ${meetingId}`);

        socket.meetingId = meetingId;
        socket.userName = name;

        const room = io.sockets.adapter.rooms.get(meetingId);

        const existingParticipants = [];

        if(room){
            room.forEach((socketId)=>{
                const participantSocket = io.sockets.sockets.get(socketId);

                if(participantSocket){
                    existingParticipants.push({
                        name : participantSocket.userName,
                        socketId: socketId
                    });
                }
            });
        }

        socket.emit("existing-participants",existingParticipants);

        socket.join(meetingId);

        socket.to(meetingId).emit("user-joined",{
            name,
            socketId: socket.id
        })

        socket.meetingId = meetingId;
        
    })

    socket.on("disconnect", () => {
        const meetingId = socket.meetingId;
        console.log("User left meeting:", meetingId);

        socket.to(meetingId).emit("user-left", {
            socketId: socket.id
        });
        
    });
});


server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})