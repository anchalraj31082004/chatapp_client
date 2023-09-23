import React, { useContext, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { ChatContext } from "../context/ChatContext";
import Avatar from "./Avatar";
import ProfileView from "./ProfileView";
import { useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";

const Navbar = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [isSideDrawerOpen, setSideDrawerOpen] = useState(false);
  // const [isProfileHidden, setIsProfileHidden] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useContext(ChatContext);
  const navigate = useNavigate();

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const toggleSideDrawer = () => {
    setSideDrawerOpen(!isSideDrawerOpen);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toggleProfileView = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="flex justify-between items-center bg-slate-900 text-slate-300 px-6 md:px-10 py-3 ">
        <div>
          <button
            className="flex justify-center items-center gap-2"
            onClick={toggleSideDrawer}
          >
            <AiOutlineSearch className="text-2xl" />
            <span className="hidden md:flex">Search users</span>
          </button>
        </div>
        <div>
          <h1 className="text-xl font-bold md:text-3xl">Chat App</h1>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div>
            <button>
              <FaBell className="text-sm md:text-lg fill-yellow-400 hover:fill-sky-500 active:fill-white transition-all" />
            </button>
          </div>

          <div>
            <div onClick={toggleHidden}>
              <Avatar src={user?.pic} name={user?.name} />
            </div>
            <div
              className={
                isHidden
                  ? "hidden"
                  : "transition-all duration-500 min-w-[100px] md:min-w-[150px] absolute list-none pr-4 pl-2 py-2 text-sm rounded-md text-slate-950 bg-amber-500 z-10 right-3 top-12 md:top-16 md:pl-4 md:pr-6 md:py-3 md:text-base shadow-2xl shadow-amber-500 tracking-wider"
              }
            >
              <li
                className="hover:text-sky-600 transition-all active:text-white cursor-pointer"
                onClick={toggleProfileView}
              >
                Profile
              </li>
              <hr className="w-full my-2" />
              <li
                className="hover:text-sky-600 transition-all active:text-white cursor-pointer"
                onClick={logoutHandler}
              >
                Logout
              </li>
            </div>
          </div>
        </div>
      </div>
      <SideDrawer isOpen={isSideDrawerOpen} onClose={toggleSideDrawer} />
      <ProfileView isOpen={isProfileOpen} onClose={toggleProfileView} />
    </>
  );
};

export default Navbar;
