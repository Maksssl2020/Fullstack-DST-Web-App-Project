import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider.jsx";
const useAuthentication = () => {
  return useContext(AuthContext);
};

export default useAuthentication;
