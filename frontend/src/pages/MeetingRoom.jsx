import React from 'react'
import { useLocation, useParams } from "react-router-dom";

const MeetingRoom = () => {
  const {meetingId} = useParams();
  const location = useLocation();

  const name = location.state?.name
  
  return (
    <div>
      <h1>Meeting Id: {meetingId}</h1>
      <h2>Host Name: {name}</h2>
    </div>
  )
}

export default MeetingRoom
