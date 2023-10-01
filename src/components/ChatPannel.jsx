import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import SingleChat from "./SingleChat";

const ChantPannel = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useContext(ChatContext);

  return (
    <div
      className={`${
        selectedChat ? "flex" : "hidden"
      } items-center flex-col p-3 bg-slate-900 w-full md:flex md:flex-col md:items-center md:p-3 md:bg-slate-900 min-h-[calc(100vh-95px)]  text-white md:w-68 md:border-l-4 md:border-amber-500 md:rounded-lg md:border-t-0 `}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChantPannel;
