import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/others/useAuthentication.js";

const ProtectedRouteAdmin = () => {
  const { role, isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);

    if (!isAuthenticated) {
      navigate("/sign-in");
    }

    if (role !== "ADMIN") {
      navigate("/");
    }
  }, [isAuthenticated, navigate, role]);

  return <Outlet />;
};

export default ProtectedRouteAdmin;
