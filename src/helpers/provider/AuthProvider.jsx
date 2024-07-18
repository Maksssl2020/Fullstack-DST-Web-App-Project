import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(getToken());
    setUsername(decodedToken.username);
    setRole(decodedToken.authorities);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setUsername(decodedToken.username);
          setRole(decodedToken.authorities);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.log(error);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, getToken, username, role }}
    >
      <React.StrictMode>{children}</React.StrictMode>
    </AuthContext.Provider>
  );
};
