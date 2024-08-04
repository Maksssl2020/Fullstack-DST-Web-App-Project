import React, { useContext, useEffect } from "react";
import AccountBasicDataForm from "../../form/AccountBasicDataForm";
import { GetRole } from "../../../helpers/RolesTranslate";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto";
import AddingPhotoModal from "../../modal/AddingPhotoModal";

const AccountUserSection = ({ userData, onChange, updateErrors }) => {
  const { role, accountCreationDate } = useContext(AuthContext);
  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const [identifyImage, setIdentifyImage] = React.useState("");
  const [avatar, setAvatar] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
    setDateOfBirth([userData.dateOfBirth]);
    setIdentifyImage(userData.identifyPhoto);
    setAvatar(userData.avatar);

    const fullName = `${userData.firstName} ${userData.lastName}`;
    setFullname(fullName);
  }, [userData]);

  useEffect(() => {
    onChange("username", userData.username !== username ? username : null);
    onChange("email", userData.email !== email ? email : null);
    onChange(
      "phoneNumber",
      userData.phoneNumber !== phoneNumber ? phoneNumber : null,
    );
    onChange(
      "identifyImage",
      userData.identifyPhoto !== identifyImage ? identifyImage : null,
    );
    onChange("avatar", userData.avatar !== avatar ? avatar : null);
  }, [username, phoneNumber, email, identifyImage, avatar]);

  const handleModalOpen = (imageTitle = undefined) => {
    setOpenModal(!openModal);

    if (imageTitle !== undefined) {
      setSelectedImage(imageTitle);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAvatar(file);
    }
  };

  const handleIdentifyPhotoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setIdentifyImage(file);
    }

    console.log(file);
  };

  const imagesData = [
    {
      title: "Zdjęcie identyfikujące:",
      imageSrc: userData.identifyPhoto,
      bottomDataTitle: "Data urodzenia:",
      bottomData: dateOfBirth,
    },
    {
      title: "Zdjęcie profilowe:",
      imageSrc: userData.avatar,
      bottomDataTitle: "Status konta:",
      bottomData: GetRole(role),
    },
  ];

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
              {fullname}
            </p>
          </div>
        </div>
        <div className="flex w-full">
          <AccountBasicDataForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            accountCreationDate={accountCreationDate}
            updateErrors={updateErrors}
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
      <div className="ml-auto w-[30%] bg-custom-pink-100 rounded-2xl h-full">
        <div className="w-full h-[100px] bg-custom-orange-200 rounded-2xl flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold italic">
            Uczestniczył w:
          </h2>
        </div>
      </div>
      {openModal && (
        <AddingPhotoModal
          modalTitle={selectedImage.replace(":", " ")}
          closeModal={handleModalOpen}
          onChangeAction={
            selectedImage.includes("profilowe")
              ? handleAvatarChange
              : handleIdentifyPhotoChange
          }
        />
      )}
    </>
  );
};

export default AccountUserSection;
