import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/queries/useAuthentication.js";

const ProtectedRouteAuthenticatedUser = () => {
  const { isAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default ProtectedRouteAuthenticatedUser;
