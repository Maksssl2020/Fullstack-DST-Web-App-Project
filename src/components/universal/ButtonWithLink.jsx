import React from "react";
import { Link } from "react-router-dom";

const ButtonWithLink = ({ title, link, styling: className }) => {
  return (
    <Link to={link} className={className}>
      <p>{title}</p>
    </Link>
  );
};

export default ButtonWithLink;
