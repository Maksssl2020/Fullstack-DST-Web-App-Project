import React, { useEffect, useState } from "react";
import { getRole } from "../../../helpers/ApiDataTranslator.js";
import AccountBasicDataForm from "../../form/AccountBasicDataForm.jsx";
import { useNavigate } from "react-router-dom";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto.jsx";
import DefaultModal from "../../modal/DefaultModal.jsx";
import CloseIcon from "../../drawer/icons/CloseIcon.jsx";
import FormItem from "../../form/FormItem.jsx";
import useAuthentication from "../../../hooks/others/useAuthentication.js";
import { AnimatePresence, motion } from "framer-motion";
import AdminManagementOptionButton from "../../button/AdminManagementOptionButton.jsx";
import AccountAdminWebsiteManagementSection from "./AccountAdminWebsiteManagementSection.jsx";
import AccountAdminShopManagementSection from "./AccountAdminShopManagementSection.jsx";

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
  const [chosenSection, setChosenSection] = useState("ACCOUNT");

  const sectionButtonsData = [
    {
      name: "Konto",
      value: "ACCOUNT",
    },
    {
      name: "Strona",
      value: "WEBSITE",
    },
    {
      name: "Sklep",
      value: "SHOP",
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
    <div className={"max-lg:w-[95%] lg:w-[900px] flex flex-col"}>
      <div
        className={
          "mb-2 w-full flex h-[75px] text-black justify-center items-center gap-12 bg-custom-gray-100 rounded-2xl"
        }
      >
        {sectionButtonsData.map((data, index) => (
          <motion.button
            initial={{
              background: "#F4F4F4",
              color: "#000000",
              borderColor: "#000000",
            }}
            animate={
              chosenSection === data.value
                ? {
                    background: "#FF5A5A",
                    color: "#FFFFFF",
                    borderColor: "#FF5A5A",
                  }
                : {
                    background: "#F4F4F4",
                    color: "#000000",
                    borderColor: "#000000",
                  }
            }
            exit={{
              background: "#F4F4F4",
              color: "#000000",
              borderColor: "#000000",
            }}
            key={index}
            onClick={() => setChosenSection(data.value)}
            className={
              "max-md:w-[100px] md:w-[150px] h-[50px] border-2 border-black rounded-xl font-bold uppercase text-xl"
            }
          >
            {data.name}
          </motion.button>
        ))}
      </div>
      <div className={"flex rounded-2xl bg-white"}>
        <AnimatePresence>
          {chosenSection === "ACCOUNT" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full rounded-2xl h-auto flex flex-col"
            >
              <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-100 flex justify-center items-center">
                Informacje o koncie
              </div>
              <div className="flex max-xl:flex-col">
                <AccountBasicDataForm
                  userData={userData}
                  register={register}
                  accountCreationDate={accountCreationDate}
                  errors={errors}
                />
                <AccountSectionUserPhoto
                  className={"max-xl:self-center"}
                  imageTitle={"Zdjęcie profilowe:"}
                  mainImageSrc={avatar}
                  bottomDataTitle={"Status konta:"}
                  bottomData={getRole(role)}
                  openModal={handleModalOpen}
                />
              </div>
            </motion.div>
          )}
          {chosenSection === "WEBSITE" && (
            <AccountAdminWebsiteManagementSection />
          )}
          {chosenSection === "SHOP" && <AccountAdminShopManagementSection />}
        </AnimatePresence>
      </div>
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default AccountAdminSection;
