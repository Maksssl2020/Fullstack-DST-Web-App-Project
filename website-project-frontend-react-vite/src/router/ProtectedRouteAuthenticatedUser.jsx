import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/queries/useAuthentication.js";
import { useSelector } from "react-redux";

const ProtectedRouteAuthenticatedUser = () => {
  const { isAuthenticated } = useAuthentication();
  const isa = useSelector((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(isa);
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  return <Outlet />;
};

export default ProtectedRouteAuthenticatedUser;
