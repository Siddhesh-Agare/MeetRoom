import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JoinMeeting = () => {
  const [name, setName] = useState("");
  const [meetingId, setMeetingId] = useState("")
  const navigate = useNavigate();

  const handleJoinMeeting = (e)=>{
    e.preventDefault()

    if (!name.trim()) {
    toast.error("Please enter your name");
    return;
    }

    if (!meetingId.trim()) {
    toast.error("Please enter your Meeting ID");
    return;
    }

    navigate(`/meeting/${meetingId.trim()}`,{
      state:{
        name: name.trim()
      }
    })

  }
  return (
    <div>
      <form action="" onSubmit={handleJoinMeeting}>
        <h1>Join meeting</h1>
        Enter your name:
        <input onChange={(e)=>{
          setName(e.target.value)
        }} type="text" value={name} />
         Enter your meeting Id:
        <input onChange={(e)=>{
          setMeetingId(e.target.value)
        }} type="text" value={meetingId} />
        <button>Join Meeting</button>
      </form>
    </div>
  )
}

export default JoinMeeting
