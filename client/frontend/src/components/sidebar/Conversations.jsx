import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  
  return (
    <div className="py-2 flex flex-col  max-w-64">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation.room._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIndex={idx === conversation.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
};

export default Conversations;
