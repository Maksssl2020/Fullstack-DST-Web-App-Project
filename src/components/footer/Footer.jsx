import React from "react";
import FooterTable from "../table/FooterTable.jsx";

const Footer = () => {
  return (
    <footer className="flex h-[300px] w-full justify-center">
      <div className="mt-auto flex h-[250px] w-[95%] justify-center rounded-t-3xl bg-custom-gray-300">
        <FooterTable />
        <div className="ml-auto mr-10 h-[175px] w-[175px] self-center">
          <img
            className="inset-0 h-full w-full rounded-full object-cover"
            src="/assets/images/website-logo.jpg"
            alt=""
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
