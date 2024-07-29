import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [accountCreationDate, setAccountCreationDate] = useState("");
  const [loading, setLoading] = useState(false);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(getToken());
    setUsername(decodedToken.username);
    setRole(decodedToken.authorities.toLocaleString());
    setAccountCreationDate(decodedToken.accountCreationDate);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
    setLoading(false);
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
          setRole(decodedToken.authorities.toLocaleString());
          setAccountCreationDate(decodedToken.accountCreationDate);
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.log(error);
        logout();
      }
    } else {
      logout();
    }
    setLoading(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        getToken,
        username,
        role,
        accountCreationDate,
        loading,
      }}
    >
      <React.StrictMode>{children}</React.StrictMode>
    </AuthContext.Provider>
  );
};
