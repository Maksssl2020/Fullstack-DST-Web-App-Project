import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getToken }}>
      <React.StrictMode>{children}</React.StrictMode>
    </AuthContext.Provider>
  );
};
