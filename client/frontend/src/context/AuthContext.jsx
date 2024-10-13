const { createContext, useContext } = require("react");



const AuthContext = createContext(); 


export function AuthProvider({ children }) {
    return (
      const auth = useProvideAuth();
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
  useContext(AuthContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password) => {
    // call the signin api
    setUser({ email });
  };

  const signout = () => {
    // call the signout api
    setUser(null);
  };

  return {
    user,
    signin,
    signout
  };
}