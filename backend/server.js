import express from 'express'
import cors from 'cors'
import meetingRouter from './src/Routes/meetingRoutes.js';

const app = express();
app.use(cors())
app.use(express.json())

const PORT = 5000;

app.get("/", (req,res)=>{
    res.send("Meeting room is running ")
})

app.use("/api",meetingRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    
})