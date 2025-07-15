import { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context
export const AuthContext = createContext();

// 2️⃣ Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On mount, load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login helper: save to state + localStorage
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // Logout helper: clear storage + state
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
