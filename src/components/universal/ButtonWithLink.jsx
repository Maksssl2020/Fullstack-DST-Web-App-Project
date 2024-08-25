import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonWithLink = ({
  title,
  link,
  className,
  onClick = undefined,
  disabled = undefined,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (link) {
      navigate(link);
    }
  };

  return (
    <button disabled={disabled} onClick={handleClick} className={className}>
      <p>{title}</p>
    </button>
  );
};

export default ButtonWithLink;
