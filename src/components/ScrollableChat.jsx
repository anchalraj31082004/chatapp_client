import React, { useContext } from "react";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender } from "../config/ChatLogic";
import { ChatContext } from "../context/ChatContext";
import Avatar from "./Avatar";

const ScrollableChat = ({ messages }) => {
  const { user } = useContext(ChatContext);
  // console.log(user);
    // console.log(messages);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div className="flex" key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
              <div className="mr-1 mt-2 text-sm">
                <Avatar src={m.sender.pic} name={m.sender.name} />
              </div>
            )}
            <span className={`${m.sender._id === user._id ? "bg-slate-600" : "bg-sky-300"} px-4 py-2 rounded-md`}>
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
