import React from "react";
import ButtonWithLink from "../universal/ButtonWithLink";

const ModalWithClickFunction = ({
  modalTitle,
  modalSubtitle,
  fistButtonTitle,
  firstButtonLink,
  secondButtonTitle,
  secondButtonClickAction,
}) => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 z-10"></div>
      <div className="bg-custom-gray-100 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-10">
        <h2 className="text-4xl font-bold">{modalTitle}</h2>
        <p className="text-2xl text-center">{modalSubtitle}</p>
        <ButtonWithLink
          title={fistButtonTitle}
          link={firstButtonLink}
          styling={
            "w-[60%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
          }
        />
        <button
          onClick={secondButtonClickAction}
          className="w-[60%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center bg-custom-orange-100 py-1 rounded-full"
        >
          {secondButtonTitle}
        </button>
      </div>
    </div>
  );
};

export default ModalWithClickFunction;
