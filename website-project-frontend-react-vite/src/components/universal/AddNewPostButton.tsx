import React from "react";
import PlusInCircleIcon from "../../icons/PlusInCircleIcon.jsx";
import { useNavigate } from "react-router-dom";

const AddNewPostButton = ({ link }) => {
  const navigate = useNavigate();

  return (
    <div className="max-lg:w-[10%] max-2xl:w-[17.5%] 2xl:w-[25%] max-lg:px-2 lg:px-6 h-full absolute inset-0 items-center ml-auto flex">
      <button
        onClick={() => navigate(link)}
        className="max-sm:size-6 max-lg:size-12 lg:size-16 bg-white inset-0 rounded-full flex items-center justify-center "
      >
        <PlusInCircleIcon size={"max-sm:size-6 max-lg:size-10 lg:size-14"} />
      </button>
    </div>
  );
};

export default AddNewPostButton;
