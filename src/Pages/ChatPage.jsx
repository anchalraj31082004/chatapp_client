import React, { useContext, useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import SideBar from '../components/SideBar'
import ChantPannel from '../components/ChatPannel'
import Navbar from '../components/Navbar'

const ChatPage = () => {

  const [fetchAgain, setFetchAgain] = useState(false)

  const {user} = useContext(ChatContext)
  // console.log(user);

  return (
    <div className='flex flex-col h-screen'>
      {user && <Navbar/>}
      <div className={`flex items-start h-full w-full justify-between py-4 px-5`}>
        {user && <SideBar fetchAgain={fetchAgain}/>}
        {user && <ChantPannel fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      </div>
    </div>
  )
}

export default ChatPage