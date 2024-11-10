import React, { useEffect } from "react";
import AccountBasicDataForm from "../../form/AccountBasicDataForm.jsx";
import { getRole } from "../../../helpers/ApiDataTranslator.js";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto.jsx";
import Spinner from "../../universal/Spinner.jsx";
import NotificationCard from "../../card/NotificationCard.jsx";
import DefaultModal from "../../modal/DefaultModal.jsx";
import CloseIcon from "../../drawer/icons/CloseIcon.jsx";
import FormItem from "../../form/FormItem.jsx";
import useAuthentication from "../../../hooks/others/useAuthentication.js";
import IconButton from "../../button/IconButton.jsx";
import BellIcon from "../../../icons/BellIcon.jsx";
import { AnimatePresence } from "framer-motion";
import DefaultContentModal from "../../modal/DefaultContentModal.jsx";
import AnimatedCancelButton from "../../button/AnimatedCancelButton.jsx";
import useUserNotifications from "../../../hooks/queries/useUserNotifications.js";
import useAmountOfUserNewNotifications from "../../../hooks/queries/useAmountOfUserNewNotifications.js";

const AccountUserSection = ({
  userData,
  userDisplayData,
  register,
  handleImagesChange,
  watch,
  errors,
}) => {
  const { userId, role, accountCreationDate } = useAuthentication();
  const [fullName, setFullName] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] =
    React.useState(false);

  const { userNotifications, fetchingUserNotifications } =
    useUserNotifications();
  const { amountOfUserNewNotifications, fetchingAmountOfUserNewNotifications } =
    useAmountOfUserNewNotifications();

  useEffect(() => {
    const fullName = `${userData.firstName} ${userData.lastName}`;
    setFullName(fullName);
  }, [userData]);

  const handleModalOpen = (imageTitle = undefined) => {
    setOpenModal(!openModal);

    if (imageTitle !== undefined) {
      setSelectedImage(imageTitle);
    }
  };

  useEffect(() => {
    watch((values) => {
      handleImagesChange(
        "identifyPhoto",
        userData.identifyPhoto !== values.identifyPhoto
          ? values.identifyPhoto
          : null,
      );
      handleImagesChange(
        "avatar",
        userData.avatar !== values.avatar ? values.avatar : null,
      );
    });
  }, [userData, watch]);

  const imagesData = [
    ...(role !== "REGISTERED"
      ? [
          {
            title: "Zdjęcie identyfikacyjne:",
            imageSrc: userDisplayData.identifyPhoto,
            bottomDataTitle: "Data urodzenia:",
            bottomData: userData.dateOfBirth,
          },
        ]
      : []),
    {
      title: "Zdjęcie profilowe:",
      imageSrc: userDisplayData.avatar,
      bottomDataTitle: "",
      bottomData: getRole(role),
    },
  ];

  if (fetchingUserNotifications || fetchingAmountOfUserNewNotifications) {
    return <Spinner />;
  }

  return (
    <div
      className={
        "max-lg:w-[95%] lg:w-[950px] xl:w-[1050px] h-full rounded-3xl bg-white"
      }
    >
      <div className="w-full rounded-2xl h-full flex flex-col">
        <div className="w-full h-[100px] rounded-2xl bg-custom-orange-100 flex justify-center gap-4 items-center">
          <h2 className="w-[30%] font-bold text-white xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl h-full italic flex items-center justify-center">
            Informacje o koncie
          </h2>
          <div className="w-[60%] h-[85px] flex items-center p-2 bg-custom-gray-300 rounded-2xl">
            <p className={"xs:text-[14px] sm:text-sm"}>Imię i nazwisko:</p>
            <p className="xs:w-[65%] sm:w-[70%] md:w-[75%] lg:w-[80%] border-4 flex justify-center items-center xs:text-sm sm:text-lg md:text-xl lg:text-2xl border-custom-gray-200 h-full bg-white rounded-2xl ml-auto">
              {fullName}
            </p>
          </div>
          <IconButton
            onClick={() => setIsNotificationModalOpen(true)}
            className={`xs:size-8 sm:size-10 lg:size-12 xs:border-[1px] sm:border-2 border-black ${amountOfUserNewNotifications > 0 ? "bg-custom-orange-200 text-white border-white" : "bg-white text-black border-black"}`}
          >
            <BellIcon className={"xs:size-4 sm:size-6 lg:size-8"} />
          </IconButton>
        </div>
        <div className="flex max-xl:flex-col items-center w-full justify-between">
          <div className={"max-xl:w-full xl:w-[500px] h-full"}>
            <AccountBasicDataForm
              register={register}
              userData={userData}
              accountCreationDate={accountCreationDate}
              errors={errors}
            />
          </div>
          <div
            className={`h-full flex xl:w-[500px]  ${role !== "REGISTERED" ? "max-md:flex-col max-xl:justify-between" : ""}`}
          >
            <AccountSectionUserPhoto
              key={userData.username}
              className={
                role !== "REGISTERED"
                  ? "ml-auto md:w-[45%]"
                  : "ml-auto md:w-full"
              }
              image={userDisplayData.avatar}
              imageTitle={"Zdjęcie profilowe"}
              openModal={handleModalOpen}
            >
              <div className={"w-full h-auto mt-4 flex flex-col gap-1"}>
                <label className={"ml-3 text-xl"}>Status konta:</label>
                <p
                  className={
                    "border-4 px-4 text-2xl uppercase font-bold tracking-wider  flex justify-center items-center rounded-2xl h-[60px] w-full border-custom-gray-300"
                  }
                >
                  {getRole(role)}
                </p>
              </div>
            </AccountSectionUserPhoto>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isNotificationModalOpen && (
          <DefaultContentModal
            className={"md:w-[450px] rounded-2xl border-4 border-black"}
          >
            <div className="w-full bg-custom-pink-100 rounded-xl min-h-[700px]">
              <div className="w-full h-[100px] bg-custom-orange-200 rounded-b-2xl rounded-t-xl flex justify-center items-center overflow-y-auto">
                <h2 className="text-white text-4xl font-bold italic">
                  Sprawdź:
                </h2>
                <AnimatedCancelButton
                  onClick={() => setIsNotificationModalOpen(false)}
                  className={
                    "size-8 bg-white flex justify-center items-center rounded-full absolute right-0 top-0 mt-2 mr-2"
                  }
                  iconSize={"size-6"}
                />
              </div>
              <div className="px-8 py-4 flex flex-col gap-4">
                {userNotifications?.map((data, index) => (
                  <NotificationCard key={index} data={data} />
                ))}
              </div>
            </div>
          </DefaultContentModal>
        )}
        {openModal && (
          <DefaultModal title={selectedImage}>
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
              register={
                selectedImage.includes("profilowe")
                  ? { ...register("avatar") }
                  : { ...register("identifyPhoto") }
              }
            />
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccountUserSection;
