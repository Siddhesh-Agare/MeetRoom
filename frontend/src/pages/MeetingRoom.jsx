import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { io } from "socket.io-client";

const MeetingRoom = () => {
  const {meetingId} = useParams();
  const location = useLocation();
  const name = location.state?.name
  const [participants, setParticipants] = useState([])

  useEffect(()=>{
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
        console.log("Connected:", socket.id);

        setParticipants([
            {
                name,
                socketId: socket.id
            }
        ]);

        socket.emit("join-meeting", {
            meetingId,
            name
        });
    });

    socket.on("existing-participants", (users) => {
      setParticipants((prev) => [
        ...prev,
        ...users
      ]);
    });

    socket.on("user-joined",(user)=>{
      console.log("New user joined:", user);

      setParticipants((prev)=>[
        ...prev,
        user
      ]);
      
    });

    socket.on("user-left", (user) => {
      console.log("User left:", user);
      setParticipants((prev) =>
        prev.filter((participant) => participant.socketId !== user.socketId)
    );
    });

    return () =>{
      socket.disconnect();
    };
  },[]);
  
  return (
    <div>
      <h1>Meeting Room</h1>
      <p>meeting Id :{meetingId}</p>
      <p>host name : {name}</p>
      <h1>Participants</h1>
      <ul>
        {participants.map((participant)=>{
          return(
            <li key={participant.socketId}>
            {participant.name}
          </li>
          )
        })}
      </ul>
    </div>
  )
}

export default MeetingRoom
