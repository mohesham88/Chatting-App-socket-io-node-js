import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.sender._id === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const profilePic = message.sender.avatar;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-700";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="avatar" src={profilePic} referrerPolicy="no-referrer" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${bubbleBgColor} ${shakeClass}`}
      >
        {message.text}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
