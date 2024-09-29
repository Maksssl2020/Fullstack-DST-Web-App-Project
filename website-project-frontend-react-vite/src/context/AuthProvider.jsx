import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "react-query";
import { fetchUserIdByUsername } from "../helpers/api-integration/UserDataHandling.js";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAction,
  logoutUserAction,
} from "../actions/authenticationAction.js";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [accountCreationDate, setAccountCreationDate] = useState("");

  const { isAuthenticated, accessToken, role } = useSelector(
    (state) => state.authentication,
  );

  console.log(isAuthenticated);
  console.log(accessToken);

  const { data: userId, isLoading: fetchingUserId } = useQuery(
    ["userId", username],
    () => {
      if (isAuthenticated) {
        return fetchUserIdByUsername(username);
      }
    },
  );

  const setAuthenticatedUserData = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    setUsername(decodedToken.username);
    setAccountCreationDate(decodedToken.accountCreationDate);
  };

  const login = (response) => {
    const userData = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      role: response.userRole,
    };

    dispatch(loginUserAction(userData));
    setAuthenticatedUserData(response.accessToken);
  };

  const logout = () => {
    dispatch(logoutUserAction());
    setUsername("");
    localStorage.removeItem("currentForumPage");
  };

  useEffect(() => {
    if (accessToken) {
      setAuthenticatedUserData(accessToken);
    } else {
      logout();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        accessToken,
        username,
        role,
        accountCreationDate,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
