import React, { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios/instance";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  console.log(selectedConversation);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance(
          `/messages/${selectedConversation._id}`
        );

        const data = res.data;

        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
