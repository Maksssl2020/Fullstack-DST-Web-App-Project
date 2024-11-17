import React from "react";
import { AnimatePresence } from "framer-motion";
import DefaultModal from "./DefaultModal";
import CloseIcon from "../drawer/icons/CloseIcon";
import FormItem from "../form/FormItem";

const AccountUserImagesFormModal = ({ isOpen, closeModal }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <DefaultModal title={"Zdjęcie Profilowe"}>
          <button
            onClick={closeModal}
            className="absolute inset-0 ml-auto mr-3 mt-3 flex size-12 items-center justify-center rounded-full border-[3px] border-black bg-white"
          >
            <CloseIcon size={"size-8"} />
          </button>
          <FormItem
            type={"file"}
            label={"Wybierz zdjęcie:"}
            containerClassname={"text-lg font-bold"}
            inputClassname={
              "w-full file:w-[30%] file:border-0 border-4 border-black file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:rounded-l-lg file:h-full h-[75px] font-bold text-lg text-black bg-custom-gray-200 rounded-2xl"
            }
            register={{ ...register("avatar") }}
          />
        </DefaultModal>
      )}
    </AnimatePresence>
  );
};

export default AccountUserImagesFormModal;
