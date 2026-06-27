import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password, role) => {
    const res = await API.post("/users/login", { email, password, role });
    setUser(res.data.user);
    return res.data;
  };

  const register = async (fullname, email, phoneNumber, password, role) => {
    const res = await API.post("/users/register", { fullname, email, phoneNumber, password, role });
    return res.data;
  };

  const logout = async () => {
    await API.get("/users/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);