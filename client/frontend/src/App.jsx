import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login";
import { io, Socket } from "socket.io-client";


function App() {
  const { authUser } = useAuthContext();
  return (
    <div
      data-theme="cupcake"
      className="bg-base-100 p-4 h-screen flex items-center justify-center w-screen overflow-hidden"
    >
      <div className="bg-base-100 p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
