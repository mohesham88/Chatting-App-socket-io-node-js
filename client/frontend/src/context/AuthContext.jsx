import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    null
  );

  useEffect(() => {
    const authenticate = async () => {
      const auth = await checkAuth();
      setAuthUser(auth);
    }
    authenticate();
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const checkAuth = async () => {
  try {
    
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/profile`, {
      withCredentials: true,
    });
    
    if (response.status === 200) {
      console.log(response)
      return response.data;
    }
  } catch (error) {
    console.error('Authentication check failed', error);
  }
  return null;
};
