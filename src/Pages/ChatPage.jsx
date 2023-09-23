import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import SideBar from '../components/SideBar'
import ChantPannel from '../components/ChatPannel'
import Navbar from '../components/Navbar'

const ChatPage = () => {

  const {user} = useContext(ChatContext)
  // console.log(user);

  return (
    <div className='flex flex-col'>
      {user && <Navbar/>}
      <div className='flex items-start h-full w-full justify-between py-4 px-5'>
        {user && <SideBar/>}
        {user && <ChantPannel/>}
      </div>
    </div>
  )
}

export default ChatPage