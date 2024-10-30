import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/others/useAuthentication.js";

const AdminFormSection = ({
  children,
  handleSubmit,
  disabledButton,
  submitTitle,
  cancelLink = "/",
}) => {
  const { username } = useAuthentication();
  const navigate = useNavigate();

  return (
    <div className="my-8 flex flex-col items-center p-8 gap-6 w-[850px] h-auto border-4 border-black rounded-2xl">
      <div className="w-full flex text-2xl font-bold items-center justify-between mb-8">
        <p>Jesteś zalogowany jako:</p>
        <p>{username}</p>
      </div>
      {children}

      <div className="flex w-full h-[70px] mt-16 text-2xl font-bold text-white gap-4">
        <button
          onClick={() => navigate(cancelLink)}
          className="w-full h-full border-4 border-black bg-custom-orange-200 rounded-3xl uppercase"
        >
          Anuluj
        </button>
        <button
          onClick={() => handleSubmit()}
          disabled={disabledButton}
          className="w-full h-full border-4 border-black relative bg-custom-orange-200 rounded-3xl uppercase"
        >
          {submitTitle}
        </button>
      </div>
    </div>
  );
};

export default AdminFormSection;
