import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchUserIdByUsername } from "../api-integration/UserDataHandling.js";
import Spinner from "../../components/universal/Spinner.jsx";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [accountCreationDate, setAccountCreationDate] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: userId, isLoading: fetchingUserId } = useQuery(
    ["userId", username],
    () => fetchUserIdByUsername(username),
    {
      enabled: isAuthenticated === true,
    },
  );

  const getToken = () => {
    return Cookies.get("token");
  };

  const login = (token) => {
    Cookies.set("token", token, {
      secure: true,
      sameSite: "Strict",
    });

    const decodedToken = jwtDecode(token);
    setUsername(decodedToken.username);
    setRole(decodedToken.authorities.toLocaleString());
    setAccountCreationDate(decodedToken.accountCreationDate);
    setIsAuthenticated(true);
    sessionStorage.setItem("isAuthenticated", "true");
    setLoading(false);
  };

  const logout = () => {
    Cookies.remove("token");
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setUsername("");
    setRole("");
    setLoading(false);
  };

  useEffect(() => {
    if (sessionStorage.getItem("isAuthenticated") === "true") {
      const decodedToken = jwtDecode(getToken());
      setIsAuthenticated(true);
      setLoading(true);
      setUsername(decodedToken.username);
      setRole(decodedToken.authorities.toLocaleString());
      setAccountCreationDate(decodedToken.accountCreationDate);
    } else {
      setLoading(false);
      setIsAuthenticated(false);
      logout();
    }
  }, [getToken(), isAuthenticated]);

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
        userId,
        loading,
      }}
    >
      <React.StrictMode>{children}</React.StrictMode>
    </AuthContext.Provider>
  );
};
