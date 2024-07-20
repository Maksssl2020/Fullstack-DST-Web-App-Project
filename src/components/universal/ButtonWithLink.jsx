import React from "react";
import { Link } from "react-router-dom";

const ButtonWithLink = ({ title, link, styling }) => {
  return (
    <Link to={link} className={styling}>
      <p>{title}</p>
    </Link>
  );
};

export default ButtonWithLink;
