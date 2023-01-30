import React, {
  Children,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
export const AuthContext = createContext();

const ContextProvier = ({ children }) => {
  const [user, setUser] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    let users = localStorage.getItem("user");
    var localAuth = (JSON.parse(users));
    if (localAuth != null) {
      setUser(localAuth);
    } else {
      localStorage.setItem("user", JSON.stringify(null));
    }
  }, [user]);
  

  return (
    <AuthContext.Provider value={{ user, setUser, search, setSearch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvier;
