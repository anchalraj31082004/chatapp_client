import { useEffect, useState } from 'react'
import axios from "axios"

const SideBar = () => {

  const [chats, setChats] = useState([])

  const fetchData = async () => {
    const resp = await axios.get("http://localhost:5000/api/chat");
    const data = resp.data;
    console.log(data);
    setChats(data)
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div>
      {
        chats.map((elm) => (
          <div>{elm.chatName}</div>
        ))
      }
    </div>
  )
}

export default SideBar