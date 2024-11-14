import React from "react";
import FormItem from "../form/FormItem.jsx";
import CloseIcon from "../drawer/icons/CloseIcon.jsx";

const AddingPhotoModal = ({ modalTitle, onChangeAction, closeModal }) => {
  return (
    <div className="fixed font-lato inset-0 flex items-center justify-center z-20">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 z-20"></div>
      <div className="bg-custom-gray-100 relative border-custom-orange-200 border-4 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-20">
        <h2 className="text-4xl font-bold">{`Dodaj ${modalTitle.toLowerCase()}`}</h2>
        <button
          onClick={closeModal}
          className="absolute size-12 bg-white border-[3px] flex justify-center items-center rounded-full ml-auto mt-3 mr-3 border-black inset-0"
        >
          <CloseIcon size={"size-8"} />
        </button>
        <FormItem
          type={"file"}
          labelData={"Wybierz zdjęcie:"}
          containerStyling={"text-lg font-bold"}
          inputStyling={
            "w-full file:w-[30%] file:border-0 border-4 border-black file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:rounded-l-lg file:h-full h-[75px] font-bold text-lg text-black bg-custom-gray-200 rounded-2xl"
          }
          onChangeAction={onChangeAction}
        />
      </div>
    </div>
  );
};

export default AddingPhotoModal;
