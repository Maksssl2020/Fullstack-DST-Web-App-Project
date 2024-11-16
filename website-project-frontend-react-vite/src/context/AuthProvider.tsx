import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  // const dispatch = useDispatch();
  // const [username, setUsername] = useState("");
  // const [accountCreationDate, setAccountCreationDate] = useState("");
  //
  const { isAuthenticated, accessToken, role } = useSelector(
    (state: RootState) => state.persistedReducer.authentication,
  );
  //
  // console.log(isAuthenticated);
  // console.log(accessToken);
  //
  // // const { data: userId, isLoading: fetchingUserId } = useQuery(
  // //   ["userId", username],
  // //   () => {
  // //     if (isAuthenticated) {
  // //       return fetchUserIdByUsername(username);
  // //     }
  // //   },
  // //   {
  // //     cacheTime: 30,
  // //   },
  // // );
  //
  // const setAuthenticatedUserData = (accessToken) => {
  //   const decodedToken = jwtDecode(accessToken);
  //   setUsername(decodedToken.username);
  //   setAccountCreationDate(decodedToken.accountCreationDate);
  // };
  //
  // const login = (response) => {
  //   const userData = {
  //     accessToken: response.accessToken,
  //     refreshToken: response.refreshToken,
  //     role: response.userRole,
  //   };
  //
  //   dispatch(loginUserAction(userData));
  //   setAuthenticatedUserData(response.accessToken);
  // };
  //
  // const logout = () => {
  //   // dispatch(logoutUserAction());
  //   setUsername("");
  //   localStorage.removeItem("currentForumPage");
  // };
  //
  // useEffect(() => {
  //   if (accessToken) {
  //     setAuthenticatedUserData(accessToken);
  //   } else {
  //     logout();
  //   }
  // }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        // login,
        // logout,
        accessToken,
        // username,
        // role,
        // accountCreationDate,
        // userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
