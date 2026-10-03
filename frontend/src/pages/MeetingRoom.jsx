import React, { useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const MeetingRoom = () => {
  const {meetingId} = useParams();
  const location = useLocation();
  const name = location.state?.name

  useEffect(()=>{
    const socket = io("http://localhost:5000");

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
