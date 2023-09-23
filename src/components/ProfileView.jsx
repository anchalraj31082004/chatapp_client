import React, { useContext } from "react";
import { VscClose } from "react-icons/vsc";
import { ChatContext } from "../context/ChatContext";

const ProfileView = ({ isOpen, onClose }) => {
  const { user } = useContext(ChatContext);
  // console.log(user);

  return (
    <section
      className={ ` fixed inset-0 flex items-center justify-center ${isOpen? "block" : "hidden"} `
      }
    >
      <div
        className={`p-5 w-64 md:w-[520px] md:h-[400px] bg-amber-500 shadow-2xl rounded-lg shadow-amber-500 z-50` }
      >
        <button className="text-white" onClick={onClose}>
          <VscClose className=" text-lg md:text-2xl hover:text-sky-300 font-bold active:text-sky-600 text-white" />
        </button>
        <div className="flex flex-col text-white gap-4  items-center justify-center">
          <div className="md:h-36 md:w-36 h-24 w-24 rounded-full bg-sky-500 text-center border-4 flex items-center justify-center">
            <img
              className="m-auto text-5xl"
              src={user?.pic}
              alt={user?.name[0].toUpperCase()}
            />
          </div>
          <div className="flex flex-col gap-1 md:gap-4 items-center">
          <h3 className="text-lg md:text-2xl font-bold">{user?.name}</h3>
          <h4 className=" text-sm font-normal md:text-xl ">{user?.email}</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileView;
