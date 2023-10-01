import React, { useContext, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { ChatContext } from "../context/ChatContext";
import { VscClose } from "react-icons/vsc";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserListItem from "./UserListItem";

const UpdatedGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
  onClose,
  isOpen,
  fetchMessages,
}) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = useContext(ChatContext);

  // console.log(selectedChat);


  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        config
      );
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast(`Failed to load search result, ${error.message}`, {
        position: "top-center",
        type: "Error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false)
    }
  };


  const handleAddUser = async (user1) => {
    if(selectedChat.users.find((u) => u._id === user1._id)) {
      toast(`Error, User already in group`, {
        position: "top-center",
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return
    };

    if(selectedChat.groupAdmin._id !== user._id){
      toast(`Error, Only admin can add the user`, {
        position: "top-center",
        type: "error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return
    }

    try {
      setLoading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const {data} = await axios.put(`http://localhost:5000/api/chat/addgroup`, {
        chatId: selectedChat._id,
        userId: user1._id,
      }, config)
      setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      setLoading(false)
      setSearchResult("")

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
      setLoading(false)
    }
    setGroupChatName("");
  };

 
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:5000/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      // console.log(data._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast(`Failed to update the name, ${error.message}`, {
        position: "top-center",
        type: "Error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };


  const handleRemove = async (user1) => {
    if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id){
      toast(`Only admin can remove the someone!`, {
        position: "top-center",
        type: "Error",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return
    }

    try {
      setLoading(true)
      const config ={
        headers:{
          Authorization: `Bearer ${user.token}`,
        },
      }

      const {data} = await axios.put(`http://localhost:5000/api/chat/removegroup`, {
        chatId:selectedChat._id,
        userId: user1._id,
      },config)

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data)
      setFetchAgain(!fetchAgain)
      fetchMessages()
      setLoading(false)
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
      setLoading(false)
    }
    setGroupChatName("")
  };

  return (
    <>
      <div>
        <button className="flex" onClick={onClose}>
          <AiFillEye />
        </button>
      </div>
      {isOpen ? (
        <div
          className={`absolute top-[28%] left-[22%] md:left-[50%] h-fit w-fit  flex items-center justify-center`}
        >
          <div className="bg-white text-black w-64 md:w-96  flex flex-col mx-auto rounded md:p-5 py-3 px-6
           shadow-lg z-50">
            <button className="text-black" onClick={onClose}>
              <VscClose className=" text-sm md:text-lg hover:text-sky-300 font-bold active:text-sky-600 " />
            </button>
            <div className="flex items-center flex-col gap-3 justify-center">
              <span className="text-lg md:text-xl text-slate-600 font-bold">
                {selectedChat?.chatName.toUpperCase()}
              </span>
              <div className="flex flex-wrap items-center justify-center w-full">
                {selectedChat?.users?.map((user) => (
                  <UserBadgeItem
                    key={user._id}
                    user={user}
                    admin={selectedChat.groupAdmin}
                    handleFunction={() => handleRemove(user)}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-2 md:gap-4 items-end ">
                <div className="flex justify-between gap-2 ">
                  <input
                    placeholder="Chat Name"
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    className="text-black w-36 md:w-48 border border-sky-300 px-2 py-1 md:py-2  rounded focus:outline-none focus:ring focus:border-amber-500 placeholder:text-base"
                  />
                  <button
                    onClick={handleRename}
                    className="px-3 py-1 rounded text-base bg-green-900 text-white"
                  >
                    update
                  </button>
                </div>
                <input
                  placeholder="Add users to group"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="text-black w-full border border-sky-300 px-2 py-1 md:py-2  rounded focus:outline-none focus:ring focus:border-amber-500 placeholder:text-base"
                />
                {loading ? (
                  <div className="flex items-center justify-center my-5">
                    <img
                      className="h-20 p-2 rounded-full shadow-xl shadow-amber-500"
                      src="/loader.gif"
                    />
                  </div>
                ) : (
                  searchResult && searchResult ?.slice(0, 3)
                  .map((user) => (
                    <UserListItem
                     key={user._id} 
                     user={user} 
                     handleFunction={() => handleAddUser(user)}
                     />
                  ))
                )}
                <button
                  onClick={() => handleRemove(user)}
                  className="px-2 py-2 rounded bg-red-600 text-white text-base"
                >
                  Leave group
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <ToastContainer />
    </>
  );
};

export default UpdatedGroupChatModel;
