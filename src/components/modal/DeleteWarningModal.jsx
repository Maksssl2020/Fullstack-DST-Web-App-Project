import React from "react";

const DeleteWarningModal = ({ itemId, handleDeleteFunc, onClose }) => {
  return (
    <div className="fixed font-lato inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-40 z-10"></div>
      <div className="bg-custom-gray-100 border-4 border-custom-orange-200 gap-6 w-[650px] flex flex-col items-center h-auto p-8 rounded-2xl z-10">
        <h2 className="text-4xl font-bold">UWAGA!</h2>
        <p className="text-2xl">Czy na pewno chcesz usunąć post?</p>
        <button
          onClick={() => {
            handleDeleteFunc(itemId);
            onClose();
          }}
          className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-2 border-black bg-custom-orange-200 py-1 rounded-full"
        >
          tak
        </button>
        <button
          onClick={onClose}
          className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-2 border-black bg-custom-orange-200 py-1 rounded-full"
        >
          nie
        </button>
      </div>
    </div>
  );
};

export default DeleteWarningModal;
