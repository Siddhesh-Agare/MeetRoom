import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './pages/home'
import CreateMeeting from './pages/CreateMeeting'
import JoinMeeting from './pages/JoinMeeting'
import MeetingRoom from './pages/MeetingRoom'


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/create' element={<CreateMeeting/>}/>
        <Route path='/join' element={<JoinMeeting/>}/>
        <Route path='/meeting/:meetingId' element={<MeetingRoom/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
