import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      transports: ["websocket"],
    });
    /* if (authUser) { */
    console.log(socket);
    setSocket(socket);
    socket.on("handshake", (msg) => {
      console.log(msg);
    });
    socket.on("conncetion", (socket) => {
      cout << "connected frontend";
    });

    // socket.emit("hi");

    // socket.on() is used to listen to the events. can be used both on client and server side
    /* socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    }); */
    return () => socket;
    return () => socket.close();
    /* else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    } */
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket /* , onlineUsers */ }}>
      {children}
    </SocketContext.Provider>
  );
};
