import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getSender, getSenderFull } from "../config/ChatLogic";
import ProfileView from "./ProfileView";
import UpdatedGroupChatModel from "./UpdatedGroupChatModel";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isUpdateGroupModelOpen, setIsUpdateGroupModelOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = useContext(ChatContext);

  const toggleGroupMOdel = () => {
    setIsUpdateGroupModelOpen(!isUpdateGroupModelOpen);
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage("");

        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setMessages([...messages, data]);
      } catch (error) {
        toast(`Error, Failed to send messages`, {
          position: "top-center",
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      console.log(messages);
    } catch (error) {
      toast(`Error, ${error.message}`, {
        position: "top-center",
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div className="text-lg md:text-xl px-2 pb-2 w-full flex justify-between items-center">
            <button
              className="flex md:hidden text-white"
              onClick={() => setSelectedChat("")}
            >
              <AiOutlineArrowLeft />
            </button>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileView
                  isOpen={isUpdateGroupModelOpen}
                  onClose={toggleGroupMOdel}
                  currentUser={getSenderFull(user, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatedGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  onClose={toggleGroupMOdel}
                  isOpen={isUpdateGroupModelOpen}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </div>
          <div className="flex flex-col justify-end p-3  overflow-hidden rounded-md w-full mt-2 min-h-[75vh]">
            {loading ? (
              <div className="flex items-center justify-center min-h-[75vh]">
                <img
                  className=" h-40 p-6 rounded-full shadow-lg shadow-yellow-300 transition-all duration-300"
                  src="/loader.gif"
                  alt="loading"
                />
              </div>
            ) : (
              <div className="min-h-[75vh] flex flex-col overflow-y-scroll">
                <ScrollableChat messages={messages}/>
              </div>
            )}
            <div onKeyDown={sendMessage}> 
              <input
                required
                onChange={typingHandler}
                value={newMessage}
                placeholder="Enter a message"
                className="text-black border border-sky-300 px-3 py-3 w-full rounded-full focus:outline-none focus:ring focus:border-amber-500"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center  min-h-[calc(100vh-120px)] ">
          <p className=" text-3xl animate-pulse font-medium text-blue-400 text-center  ">
            Click the user to start chat!
          </p>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default SingleChat;
