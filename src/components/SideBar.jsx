import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BsPlusLg } from "react-icons/bs";
import { getSender } from "../config/ChatLogic";
import GroupChat from "./GroupChat";

const SideBar = () => {

  const [loggedUser, setLoggedUser] = useState();
  const [isGroupChat, setIsGroupChat] = useState(false)


  const { selectedChat, setSelectedChat, chats, setChats } =
    useContext(ChatContext);


  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/chat`,
        config
      );
      // console.log(data);
      setChats(data);
    } catch (error) {
      toast(`Error fetching the chat, ${error.message}`, {
        position: "top-center",
        type: "warning",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  const groupChatToggle = () => {
    setIsGroupChat(!isGroupChat)
  }

  return (
    <>
      <div
        className={`flex flex-col items-center p-3 bg-slate-900 w-full flex-shrink-0 md:w-[28%] min-h-[calc(100vh-95px)]  border-none rounded-lg ${selectedChat ? 'flex' : `hidden`}`}
      >
        <div className="px-3 pb-3 text-xl font-normal md:text-2xl flex w-full justify-between items-center text-white ">
          <h3>My Chats</h3>
          <button
           className="flex "
           onClick={groupChatToggle}>
            <BsPlusLg />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-3 bg-slate-900 w-full h-full rounded-lg overflow-hidden">
          {chats &&
            chats.map((chat) => (
              <div
                key={chat._id}
                className={`cursor-pointer ${
                  selectedChat === chat
                    ? "bg-slate-200 text-slate-950 active:bg-sky-500"
                    : "bg-amber-500 text-slate-800"
                } px-3 py-2 rounded-lg text-lg font-normal transition-all duration-300 ease-in-out`}
                onClick={() => setSelectedChat(chat)}
              >
                <p>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </p>
              </div>
            ))}
        </div>
      </div>
      <GroupChat isOpen={isGroupChat} onClose={groupChatToggle}/>
      <ToastContainer />
    </>
  );
};

export default SideBar;
