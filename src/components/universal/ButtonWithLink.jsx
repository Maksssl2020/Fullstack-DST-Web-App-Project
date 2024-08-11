import React from "react";
import { Link } from "react-router-dom";

const ButtonWithLink = ({ title, link, className, onClick = undefined }) => {
  return (
    <Link onClick={onClick} to={link} className={className}>
      <p>{title}</p>
    </Link>
  );
};

export default ButtonWithLink;
