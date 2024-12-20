import React from "react";
import useConversation from "../../zustand/useConversation";
/* import { useSocketContext } from "../../context/SocketContext";
 */

const Conversation = ({ conversation, lastIndex, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  // const { onlineUsers } = useSocketContext();
  // console.log({ onlineUsers });
  // const isOnline = onlineUsers && onlineUsers.includes(conversation._id);
  /* console.log(conversation.room._id); */
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-third rounded p-2 cursor-pointer py-1 ${
          isSelected ? "bg-third" : ""
        }`}
        onClick={() => setSelectedConversation(conversation.room)}
      >
        <div className={`avatar online}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.room.picture} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col">
              <p className="font-bold text-black">{conversation.room.name}</p>
              {conversation.last_msg && (
                <p className="text-gray-500 text-sm truncate w-full max-w-[170px] overflow-hidden text-ellipsis">
                  {conversation.last_msg.text}
                </p>
              )}
            </div>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
