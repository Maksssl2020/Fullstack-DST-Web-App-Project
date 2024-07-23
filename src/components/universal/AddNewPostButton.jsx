import React from "react";
import PlusInCircleIcon from "../../icons/PlusInCircleIcon";
import { useNavigate } from "react-router-dom";

const AddNewPostButton = ({ link }) => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] px-6 h-full absolute inset-0 items-center ml-auto flex">
      <button
        onClick={() => navigate(link)}
        className="size-[64px] bg-white inset-0 rounded-full flex items-center justify-center "
      >
        <PlusInCircleIcon size={"size-14"} />
      </button>
    </div>
  );
};

export default AddNewPostButton;
