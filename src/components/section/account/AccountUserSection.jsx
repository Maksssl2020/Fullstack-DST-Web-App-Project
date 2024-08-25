import React, { useContext, useEffect } from "react";
import AccountBasicDataForm from "../../form/AccountBasicDataForm";
import { getRole } from "../../../helpers/ApiDataTranslator";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto";
import AddingPhotoModal from "../../modal/AddingPhotoModal";
import { useQuery } from "react-query";
import { fetchUserNotifications } from "../../../helpers/api-integration/NotificationsHandling";
import Spinner from "../../universal/Spinner";
import NotificationCard from "../../card/NotificationCard";
import { useForm } from "react-hook-form";
import DefaultModal from "../../modal/DefaultModal";
import CloseIcon from "../../drawer/icons/CloseIcon";
import FormItem from "../../form/FormItem";

const AccountUserSection = ({
  userData,
  register,
  handleImagesChange,
  watch,
  errors,
}) => {
  const { userId, role, accountCreationDate } = useContext(AuthContext);
  const [fullName, setFullName] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const { data: userNotifications, isLoading: fetchingUserNotifications } =
    useQuery(["userNotificationsData", userId], () =>
      fetchUserNotifications(userId),
    );

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
    {
      title: "Zdjęcie identyfikacyjne:",
      imageSrc: userData.identifyPhoto,
      bottomDataTitle: "Data urodzenia:",
      bottomData: userData.dateOfBirth,
    },
    {
      title: "Zdjęcie profilowe:",
      imageSrc: userData.avatar,
      bottomDataTitle: "Status konta:",
      bottomData: getRole(role),
    },
  ];

  if (fetchingUserNotifications) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-[68%] rounded-2xl h-full flex flex-col">
        <div className="w-full h-[100px] rounded-2xl bg-custom-orange-100 flex justify-center items-center">
          <h2 className="w-[30%] font-bold text-white text-4xl h-full italic flex items-center justify-center">
            Informacje o koncie
          </h2>
          <div className="w-[60%] h-[85px] flex items-center p-2 bg-custom-gray-300 rounded-2xl">
            <p>Imię i nazwisko:</p>
            <p className="w-[80%] border-4 flex justify-center items-center text-2xl border-custom-gray-200 h-full bg-white rounded-2xl ml-auto">
              {fullName}
            </p>
          </div>
        </div>
        <div className="flex w-full">
          <AccountBasicDataForm
            register={register}
            userData={userData}
            accountCreationDate={accountCreationDate}
            errors={errors}
          />
          {imagesData.map((data, index) => (
            <AccountSectionUserPhoto
              key={index}
              imageTitle={data.title}
              mainImageSrc={data.imageSrc}
              bottomDataTitle={data.bottomDataTitle}
              bottomData={data.bottomData}
              openModal={handleModalOpen}
            />
          ))}
        </div>
      </div>
      <div className="ml-auto w-[30%] bg-custom-pink-100 rounded-2xl h-full overflow-y-auto">
        <div className="w-full h-[100px] bg-custom-orange-200 rounded-2xl flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold italic">Sprawdź:</h2>
        </div>
        <div className="px-8 py-4 flex flex-col gap-4">
          {userNotifications?.map((data, index) => (
            <NotificationCard key={index} data={data} />
          ))}
        </div>
      </div>
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
    </>
  );
};

export default AccountUserSection;
