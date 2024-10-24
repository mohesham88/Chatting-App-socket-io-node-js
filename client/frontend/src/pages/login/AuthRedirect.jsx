import React, { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import { AuthContext } from "../../context/AuthContext";
function AuthRedirect() {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  /* const {authContext} = useAuthContext(); */
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const userData = query.get("user");

    if (userData) {
      const user = JSON.parse(decodeURIComponent(userData));
      // Store user data in local storage or state
      localStorage.setItem("user", JSON.stringify(user));

      setAuthUser(user);

      // ridirect home
      console.log("navigating to home");
      navigate("/", {
        replace: true,
      });
    } else {
      console.log("navigating auth");
      /* navigate("/auth" , {
        replace: true
      }); */
    }
  }, []);

  return <div>redirecting .....</div>;
}

export default AuthRedirect;
