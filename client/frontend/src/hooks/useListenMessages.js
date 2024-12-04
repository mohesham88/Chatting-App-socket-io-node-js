import React, { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  const { selectedConversation } = useConversation();

  useEffect(() => {
    socket.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      // console.log(newMessage);
      // const messageText = messages.message;
      console.log(newMessage.message);
      if (newMessage.roomId === selectedConversation._id) {
        setMessages([...messages, newMessage.message]);
      }

      return () => socket?.off("newMessage");
    });
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
