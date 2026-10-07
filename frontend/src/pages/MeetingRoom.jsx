import React, { useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const MeetingRoom = () => {
  const {meetingId} = useParams();
  const location = useLocation();
  const name = location.state?.name

  useEffect(()=>{
    const socket = io("http://localhost:5000");

    socket.emit("join-meeting",{
      meetingId,
      name
    })

    socket.on("user-joined",(user)=>{
      console.log("New user joined:", user);
      
    })

    socket.on("user-left", (user) => {
      console.log("User left:", user);
    });

    return () =>{
      socket.disconnect();
    };
  },[]);
  
  return (
    <div>
      <h1>Meeting Id: {meetingId}</h1>
      <h2>Host Name: {name}</h2>
    </div>
  )
}

export default MeetingRoom
