import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContext.jsx";
import { io, Socket } from "socket.io-client";
import { Children, useEffect } from "react";
import AuthRedirect from "./pages/login/AuthRedirect.jsx";

import { getToken, onMessage } from "firebase/messaging";

import { messaging } from "./config/firebase";
import { axiosInstance } from "./axios/instance.js";

const { VITE_APP_VAPID_KEY } = import.meta.env;

async function requestPermission() {
  //requesting permission using Notification API
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: VITE_APP_VAPID_KEY,
    });

    console.log("Token generated : ", token);

    // send the token to the server

    const response = await axiosInstance.post("/notifications/register", {
      deviceToken: token,
    });

    console.log("Response : ", response);
  } else if (permission === "denied") {
    //notifications are blocked
    alert("You denied for the notification");
  }
}

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  console.log("private route");
  return authUser ? children : <Navigate to="/auth" />;
};

function App() {
  useEffect(() => {
    requestPermission();
  }, []);

  onMessage(messaging, (payload) => {
    const senderId = payload.data.senderId;

    console.log("Notification received : ", payload);
    toast(payload.notification.title, {
      position: "top-right",
    });
  });

  return (
    <div
      data-theme="cupcake"
      className="bg-base-100 p-4 h-screen flex items-center justify-center w-screen overflow-hidden"
    >
      <div className="bg-base-100 p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/auth" element={<Login />} />

          <Route path="/auth/redirect" element={<AuthRedirect />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
