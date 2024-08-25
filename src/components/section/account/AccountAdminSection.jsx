import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import { getRole } from "../../../helpers/ApiDataTranslator";
import AccountBasicDataForm from "../../form/AccountBasicDataForm";
import { useNavigate } from "react-router-dom";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto";
import DefaultModal from "../../modal/DefaultModal";
import CloseIcon from "../../drawer/icons/CloseIcon";
import FormItem from "../../form/FormItem";

const AccountAdminSection = ({
  userData,
  register,
  avatar,
  handleImagesChange,
  watch,
  errors,
}) => {
  const { role, accountCreationDate } = useContext(AuthContext);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const manageShopData = [
    {
      title: "ubranie",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/clothes/add-clothing"),
    },
    {
      title: "długopis",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/pens/add-pen"),
    },
    {
      title: "kubek",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/mugs/add-mug"),
    },
    {
      title: "gadżet",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/gadgets/add-gadget"),
    },
  ];

  useEffect(() => {
    watch((values) => {
      handleImagesChange(
        "avatar",
        userData.avatar !== values.avatar ? values.avatar : null,
      );
    });
  }, [handleImagesChange, userData.avatar, watch]);

  const handleModalOpen = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <div className="w-[48%] rounded-2xl h-auto flex flex-col">
        <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-100 flex justify-center items-center">
          Informacje o koncie
        </div>
        <div className="flex">
          <AccountBasicDataForm
            userData={userData}
            register={register}
            accountCreationDate={accountCreationDate}
            errors={errors}
          />
          <AccountSectionUserPhoto
            imageTitle={"Zdjęcie profilowe:"}
            mainImageSrc={avatar}
            bottomDataTitle={"Status konta:"}
            bottomData={getRole(role)}
            openModal={handleModalOpen}
          />
        </div>
      </div>
      <div className="ml-auto w-[51%] bg-custom-pink-100 rounded-2xl h-auto flex flex-col">
        <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Stroną
        </div>
        <div className="w-full h-[35%] px-4 py-8 gap-6 flex justify-center items-center">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/article/add-article")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Stwórz nowy &nbsp;<span className="font-bold">artykuł</span>
            </button>
            <button
              onClick={() => navigate("/events/add-event")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Stwórz nowe &nbsp;<span className="font-bold">wydarzenie</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/change-statistics")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Edytuj &nbsp;<span className="font-bold">dane o kwartałach</span>
            </button>
            <button
              onClick={() => navigate("/change-statistics")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Edytuj &nbsp;<span className="font-bold">dane o kwartałach</span>
            </button>
          </div>
        </div>
        <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Sklepem
        </div>
        <div className="w-full h-[400px] text-xl justify-items-center grid grid-rows-4 grid-cols-2 px-6 py-6 gap-6">
          {manageShopData.map((data, index) => (
            <button
              onClick={data.onClickFunction}
              key={index}
              className="w-[300px] h-[75px] flex justify-center items-center bg-white border-8 border-custom-pink-200 rounded-2xl"
            >
              Dodaj:
              <span className="ml-2 uppercase text-custom-pink-200">{`${data.title}`}</span>
            </button>
          ))}
          <button
            onClick={() => navigate("/rainbow-shop/create-discount-code")}
            className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[75px] border-8 border-custom-pink-200 rounded-2xl"
          >
            Dodaj: &nbsp;
            <span className="ml-2 uppercase text-custom-pink-200">
              kod rabatowy
            </span>
          </button>
          <button
            onClick={() => navigate("/rainbow-shop/discount-codes")}
            className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[75px] border-8 border-custom-pink-200 rounded-2xl"
          >
            Zobacz: &nbsp;
            <span className="ml-2 uppercase text-custom-pink-200">
              kody rabatowe
            </span>
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[75px] border-8 border-custom-pink-200 rounded-2xl"
          >
            Zobacz: &nbsp;
            <span className="ml-2 uppercase text-custom-pink-200">
              Zamówienia
            </span>
          </button>
        </div>
      </div>
      {openModal && (
        <DefaultModal title={"Zdjęcie Profilowe"}>
          <button
            onClick={() => setOpenModal(false)}
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
            register={{ ...register("avatar") }}
          />
        </DefaultModal>
      )}
    </>
  );
};

export default AccountAdminSection;
