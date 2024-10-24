import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import { create } from "zustand";
import { useAuthContext } from "../context/AuthContext";
import { axiosInstance } from "../axios/instance";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  // const { socket } = useSocketContext();
  // const { authUser } = useAuthContext();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
      /* console.log(socket);
      socket.emit("sendMessage", {
        message,
        roomId: selectedConversation._id,
      });
      const myMessage = {
        text: message,
        sender: {
          _id: authUser._id,
          name: authUser.name,
          avatar: authUser.avatar,
        },
        createdAt: new Date().toISOString(),
      };
      */

      const res = await axiosInstance.post(
        `/messages/${selectedConversation._id}`,
        {
          text: message,
        }
      )
      console.log(`res = `);
      console.log(res);
      const data = res.data;
      setMessages([...messages, data]);
      /* const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
 */
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
