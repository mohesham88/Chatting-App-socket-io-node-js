import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContext.jsx";
import { io, Socket } from "socket.io-client";
import { Children } from "react";
import AuthRedirect from "./pages/login/AuthRedirect.jsx";

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  console.log("private route");
  return authUser ? children : <Navigate to="/auth" />;
};

function App() {
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
