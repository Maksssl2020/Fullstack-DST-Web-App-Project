import React, { useEffect } from "react";
import { getRole } from "../../../helpers/ApiDataTranslator.js";
import AccountBasicDataForm from "../../form/AccountBasicDataForm.jsx";
import { useNavigate } from "react-router-dom";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto.jsx";
import DefaultModal from "../../modal/DefaultModal.jsx";
import CloseIcon from "../../drawer/icons/CloseIcon.jsx";
import FormItem from "../../form/FormItem.jsx";
import useAuthentication from "../../../hooks/queries/useAuthentication.js";
import { motion } from "framer-motion";
import AdminManagementOptionButton from "../../button/AdminManagementOptionButton.jsx";

const AccountAdminSection = ({
  userData,
  register,
  avatar,
  handleImagesChange,
  watch,
  errors,
}) => {
  const { role, accountCreationDate } = useAuthentication();
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const manageSiteData = [
    {
      name: "Swtórz nowy",
      boldContent: "artykuł",
      onClick: () => navigate("/article/add-article"),
    },
    {
      name: "Edytuj",
      boldContent: "dane o kwartałach",
      onClick: () => navigate("/change-statistics"),
    },
    {
      name: "Swtórz nowe",
      boldContent: "wydarzenie",
      onClick: () => navigate("/events/add-event"),
    },
    {
      name: "Edytuj",
      boldContent: "dane o kwartałach",
      onClick: () => navigate("/change-statistics"),
    },
  ];

  const manageShopData = [
    {
      functionName: "Dodaj:",
      mainContent: "ubranie",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/clothes/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "długopis",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/pens/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "kubek",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/mugs/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "gadżet",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/gadgets/add"),
    },
    {
      functionName: "Dodaj:",
      mainContent: "kod rabatowy",
      onClickFunction: () => navigate("/rainbow-shop/create-discount-code"),
    },
    {
      functionName: "Sprawdź:",
      mainContent: "kody rabatowe",
      onClickFunction: () => navigate("/rainbow-shop/discount-codes"),
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
        <div className="w-full h-[35%] p-6 grid grid-cols-2 grid-rows-2 items-center">
          {manageSiteData.map((data, index) => (
            <AdminManagementOptionButton onClick={data.onClick} key={index}>
              {data.name}&nbsp;
              <span className="font-bold">{data.boldContent}</span>
            </AdminManagementOptionButton>
          ))}
        </div>
        <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Sklepem
        </div>
        <div className="w-full h-[400px] text-xl justify-items-center grid grid-rows-4 grid-cols-2 px-6 py-6 gap-6">
          {manageShopData.map((data, index) => (
            <AdminManagementOptionButton
              onClick={data.onClickFunction}
              key={index}
            >
              {data.functionName}
              <span className="ml-2 uppercase text-custom-pink-200">{`${data.mainContent}`}</span>
            </AdminManagementOptionButton>
          ))}
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
