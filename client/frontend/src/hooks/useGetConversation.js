import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../axios/instance";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setCoversations] = useState([]);

  useEffect(() => {
    const getCoversations = async () => {
      setLoading(true);
      try {
        // const res = await axios.get("/users/conversations")
        const res = await axiosInstance.get("users/conversations")
        console.log(res);
        // const res = await fetch("/api/users");
        const data = res.data;
        if (data.error) {
          throw new Error(data.error);
        }

        setCoversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getCoversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
