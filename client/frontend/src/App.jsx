import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser)
  return (
    <html data-theme ="cupcake" >

      <div className="bg-base-100 p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element= {authUser ? <Home /> : <Login />} />
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          {/* <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          /> */}
        </Routes>
        <Toaster />
      </div>
    </html>
  );
}

export default App;
