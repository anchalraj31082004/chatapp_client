import axios from "axios";
import React, { useContext, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { ChatContext } from "../context/ChatContext";

const SideDrawer = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // console.log(searchResult);

  const { user, setSelectedChat, chats, setChats } = useContext(ChatContext);

  const handleSearch = async () => {
    if (!search) {
      toast("Please enter something in search", {
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
      setLoading(false);
      // console.log(data);
      setSearchResult(data);
    } catch (error) {
      toast(`Error Occured! ${error.message}`, {
        position: "top-center",
        type: "warning",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      //create chat with user
      const { data } = await axios.post(
        "http://localhost:5000/api/chat",
        { userId },
        config
      );

      //if chat already exist append it to this chat
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast("Error whhile fetching the chat", {
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

  return (
    <div
      className={`fixed h-full w-72 bg-gray-800 text-white p-4 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform  duration-300 ease-in-out border-r-4 border-amber-500`}
    >
      <button className="text-white" onClick={onClose}>
        <VscClose className="text-2xl hover:text-amber-500 font-bold active:text-sky-600 text-white" />
      </button>
      <div className="flex flex-col gap-4 h-full">
        <h3 className="text-xl font-bold">Search User</h3>
        <div className="flex items-center gap-4">
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-black border border-sky-300 px-2 py-2 w-48 rounded focus:outline-none focus:ring focus:border-amber-500"
          />
          <button
            onClick={handleSearch}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded active:text-sky-500"
          >
            Go
          </button>
        </div>
        <div className="flex flex-col overflow-auto scroll-smooth">
          {loading ? (
            <ChatLoading />
          ) : (
            <div className="">
              {searchResult?.map((user) => (
                <UserListItem
                  key={user?._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {loadingChat && (
        <div className="flex items-center justify-center my-5">
          <img className="h-20 p-2 rounded-full shadow-xl shadow-amber-500"  src="/loader.gif" />
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default SideDrawer;
