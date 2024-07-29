import React from "react";
import ButtonWithLink from "../universal/ButtonWithLink";

const DefaultModal = ({
  modalTitle,
  modalSubtitle,
  fistButtonTitle,
  firstButtonLink,
  secondButtonTitle,
  secondButtonLink,
  closeModal,
}) => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 z-20"></div>
      <div className="bg-custom-gray-100 border-custom-orange-200 border-4 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-20">
        <h2 className="text-4xl font-bold">{modalTitle}</h2>
        <p className="text-2xl">{modalSubtitle}</p>
        <ButtonWithLink
          title={fistButtonTitle}
          link={firstButtonLink}
          styling={
            "w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center border-2 border-black justify-center bg-custom-orange-200 py-1 rounded-full"
          }
          closeModal={closeModal}
        />
        <ButtonWithLink
          title={secondButtonTitle}
          link={secondButtonLink}
          styling={
            "w-[50%] font-bold uppercase text-xl text-white h-[50px] flex items-center justify-center border-2 border-black bg-custom-orange-200 py-1 rounded-full"
          }
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default DefaultModal;
