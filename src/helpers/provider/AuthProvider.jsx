import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [accountCreationDate, setAccountCreationDate] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    return Cookies.get("token");
  };

  const login = (token) => {
    Cookies.set("token", token, {
      secure: true,
      sameSite: "Strict",
    });

    const decodedToken = jwtDecode(getToken());
    setUsername(decodedToken.username);
    setRole(decodedToken.authorities.toLocaleString());
    setAccountCreationDate(decodedToken.accountCreationDate);
    setIsAuthenticated(true);
    setLoading(false);
  };

  const isTokenExpired = (decodedToken) => {
    try {
      console.log(decodedToken.exp);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (err) {
      console.error(err);
      return true;
    }
  };

  const logout = () => {
    console.log("LOGOUT");
    Cookies.remove("token");
    setToken(null);
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        const decodedToken = jwtDecode(token);
        if (isTokenExpired(decodedToken)) {
          logout();
        } else {
          setUsername(decodedToken.username);
          setRole(decodedToken.authorities.toLocaleString());
          setAccountCreationDate(decodedToken.accountCreationDate);
          setIsAuthenticated(true);
        }
      } else {
        logout();
      }
      setLoading(true);
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

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
