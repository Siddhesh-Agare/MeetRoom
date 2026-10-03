import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios'

const CreateMeeting = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleCreateMeeting = async(e)=>{
    e.preventDefault()
     if (!name.trim()) {
    toast.error("Please enter your name");
    return;
  }
   try {
    const response = await axios.post("http://localhost:5000/api/create",
      {name})

      navigate(`/meeting/${response.data.meetingId}`,{
        state:{
          name: response.data.hostName
        }
      });



    console.log(response.data);
    
    
   } catch (error) {
     const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
   }
  }
  return (
    <div>
      <form action="" onSubmit={handleCreateMeeting}>
        <h1>Create meeting </h1>
        <input onChange={(e)=>{
          setName(e.target.value)
        }} type="text" placeholder='enter your name' value={name}  />
        <button>create meeting</button>
      </form>
    </div>
  )
}

export default CreateMeeting
