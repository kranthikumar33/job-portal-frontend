import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while we check the existing session

  // On first load (or refresh), ask the backend "who am I?" using the cookie.
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await API.get("/users/me");
        setUser(res.data.user);
      } catch (error) {
        setUser(null); // no valid cookie / not logged in
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

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
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);