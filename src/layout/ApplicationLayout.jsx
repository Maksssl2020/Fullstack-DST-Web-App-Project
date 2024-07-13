import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollToTop from "./ScrollToTop";

const ApplicationLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ApplicationLayout;
