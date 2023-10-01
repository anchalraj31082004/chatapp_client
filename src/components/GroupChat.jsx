import React, { useContext, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChat = ({ isOpen, onClose }) => {
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = useContext(ChatContext);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast(`Please fill all the feild`, {
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
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers?.map((u) => u._id)),
        },
        config
      );
      // console.log(data);

      setChats([data, ...chats]);
      setSelectedUsers([]);
      setSearchResult([]);
      setGroupChatName("");
      setSearch("");
      onClose();

      toast("Successfully created a group", {
        position: "top-center",
        type: "success",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
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

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast("User already added", {
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

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="bg-white w-64 md:w-96  flex flex-col gap-4
       mx-auto rounded md:p-5 p-3 shadow-lg z-50"
        >
          <div className="flex justify-between items-center ">
            <span className="text-lg font-bold md:text-2xl">
              {" "}
              Create Group Chat
            </span>
            <button className="" onClick={onClose}>
              <VscClose className="text-2xl text-black hover:text-amber-500 font-bold active:text-sky-600" />
            </button>
          </div>
          <div className="flex flex-col gap-5 items-center justify-center">
            <input
              placeholder="Chat Name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
              className="text-black w-full border border-sky-300 px-2 py-1 md:py-2  rounded focus:outline-none focus:ring focus:border-amber-500"
            />
            <input
              placeholder="Add users"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="text-black w-full border border-sky-300 px-2 py-1 md:py-2  rounded focus:outline-none focus:ring focus:border-amber-500"
            />
            <div className="flex flex-wrap w-full">
              {selectedUsers?.map((user) => (
                <UserBadgeItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </div>

            {loading ? (
              <div>
                <img
                  className=" h-20 p-2 rounded-full shadow-lg shadow-yellow-300"
                  src="/loader.gif"
                  alt="loading"
                />
              </div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </div>
          <div className="w-full flex justify-end">
            <button
              className="px-2 py-1 md:py-2 text-white bg-blue-500 rounded-md"
              onClick={handleSubmit}
            >
              Create chat
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default GroupChat;
